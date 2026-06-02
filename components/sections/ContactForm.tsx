'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRightIcon, CheckIcon } from '@/components/Icons';
import { type Dictionary, contactData } from '@/lib/i18n';

type Status = 'idle' | 'sending' | 'success' | 'error';

// Optional form backend (e.g. a Formspree form URL). When unset, the form
// gracefully falls back to opening the visitor's mail client — so the static
// site works with zero configuration. Set NEXT_PUBLIC_FORM_ENDPOINT to enable
// real submissions without a mail client.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const f = dict.contact.form;
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.get('company')) return;

    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const phone = String(data.get('phone') ?? '');
    const message = String(data.get('message') ?? '');

    setStatus('sending');

    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    // No backend configured → hand off to the visitor's mail client.
    const subject = `Website enquiry — ${name || 'ANALYSIS'}`;
    const body = `${f.name}: ${name}\n${f.email}: ${email}\n${f.phone}: ${phone}\n\n${message}`;
    window.location.href = `mailto:${contactData.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus('success');
    form.reset();
  }

  if (status === 'success') {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-white p-10 text-center shadow-card">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green">
          <CheckIcon className="h-7 w-7" />
        </span>
        <p className="max-w-sm text-lg font-medium text-heading">{f.success}</p>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 shadow-card md:p-8"
      noValidate
    >
      {/* Honeypot (visually hidden, ignored by humans) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name} required>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputCls} />
        </Field>
        <Field id="email" label={f.email} required>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="phone" label={f.phone} optional={f.optional}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="message" label={f.message} required>
          <textarea id="message" name="message" required rows={5} className={`${inputCls} resize-y`} />
        </Field>
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {f.error}
        </p>
      ) : null}

      <button type="submit" disabled={sending} className="btn btn-primary mt-6 w-full sm:w-auto">
        {sending ? f.sending : f.submit}
        {!sending && <ArrowRightIcon className="h-4 w-4" />}
      </button>
    </form>
  );
}

const inputCls =
  'mt-1.5 block w-full rounded-lg border border-line bg-white px-4 py-2.5 text-base text-heading transition-colors placeholder:text-inksoft focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30';

function Field({
  id,
  label,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-heading">
        {label}
        {required ? <span className="text-teal"> *</span> : null}
        {optional ? <span className="font-normal text-inksoft"> ({optional})</span> : null}
      </label>
      {children}
    </div>
  );
}
