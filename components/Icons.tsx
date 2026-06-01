import type { SVGProps } from 'react';

/**
 * Lightweight inline line-icons (1.6px stroke, 24px grid) used across the site.
 * Decorative by default (aria-hidden); pass aria-label + role="img" when meaningful.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- Services ---- */

// Pest control — a stylised bug.
export const PestIcon = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="13" rx="4.5" ry="6" />
    <path d="M12 7V4M9.5 5 12 7l2.5-2M7.5 10 4.5 8.5M16.5 10 19.5 8.5M7 13H4M20 13h-3M7.5 16 4.5 17.5M16.5 16 19.5 17.5M12 9v8" />
  </Base>
);

// Chemical analysis — an Erlenmeyer flask.
export const FlaskIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3h6M10 3v6l-5.2 8.3A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.1L14 9V3" />
    <path d="M7.7 14h8.6" />
    <circle cx="11" cy="17" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="14" cy="18.5" r="0.6" fill="currentColor" stroke="none" />
  </Base>
);

// Disinfection — a spray bottle / nebulizer.
export const SprayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 8h5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" />
    <path d="M9 8V5h4M13 5l3-1.5M16 6.5 19 5M16 9.5 19 8M19.5 4.5v0M19.5 9.5v0M22 7v0" />
    <path d="M9.5 12.5h4" />
  </Base>
);

/* ---- Trust / features ---- */

// Certified / licensed — a rosette badge.
export const BadgeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.5-1.5 7L12 18l5 2.5-1.5-7" />
    <path d="m9.7 9 1.6 1.6L14.4 7.4" />
  </Base>
);

// Eco / safe — a leaf.
export const LeafIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-9 7-13 14-13 0 9-5 14-12 14-1.5 0-2 0-2 0Z" />
    <path d="M9 15c2.5-3 5-4.5 8-5.5" />
  </Base>
);

// Experience / time — a clock.
export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

// Coverage / location — a map pin.
export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21c4-4.5 7-7.8 7-11a7 7 0 1 0-14 0c0 3.2 3 6.5 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

/* ---- Contact ---- */

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m7 10 5 5 5-5" />
  </Base>
);

export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5S14.4 18.1 12 20.5C9.6 18.1 8.4 15.1 8.4 12S9.6 5.9 12 3.5Z" />
  </Base>
);

/* ---- Wine / oenology ---- */

// Wine glass.
export const WineIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 3h10l-.7 5a4.3 4.3 0 0 1-8.6 0L7 3Z" />
    <path d="M7.4 6h9.2M12 14v5M8.5 19h7" />
  </Base>
);

// Grapes.
export const GrapeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 7V4m0 0c0-.6.7-1.2 2-1" />
    <circle cx="12" cy="9.5" r="2.2" />
    <circle cx="8.6" cy="12.5" r="2.2" />
    <circle cx="15.4" cy="12.5" r="2.2" />
    <circle cx="10.3" cy="16.2" r="2.2" />
    <circle cx="13.7" cy="16.2" r="2.2" />
  </Base>
);

// Droplet (analysis / liquids).
export const DropletIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c3 3.4 5.5 6.2 5.5 9.3A5.5 5.5 0 0 1 6.5 12.8c0-3.1 2.5-5.9 5.5-9.3Z" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Base>
);
