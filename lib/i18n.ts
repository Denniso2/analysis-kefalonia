export const locales = ['en', 'el'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The "other" locale, used by the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'el' : 'en';
}

export type PageKey = 'home' | 'services' | 'faq' | 'contact';

/** Locale-prefixed, trailing-slashed path for a page. */
export function pagePath(locale: Locale, page: PageKey): string {
  if (page === 'home') return `/${locale}/`;
  return `/${locale}/${page}/`;
}

/** Slugs of the per-service detail pages (under /services/…). */
export const serviceSlugs = ['pest-control', 'chemical-analysis', 'disinfection', 'wine-analysis'] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

/** Locale-prefixed, trailing-slashed path for a service detail page. */
export function serviceDetailPath(locale: Locale, slug: string): string {
  return `/${locale}/services/${slug}/`;
}

/* ---- Shared, language-neutral contact data ---- */
export const contactData = {
  shopPhone: { display: '2671026333', tel: '+302671026333' },
  mobile1: { display: '6950300324', tel: '+306950300324' },
  mobile2: { display: '6945061229', tel: '+306945061229' },
  email: 'polizosiak@gmail.com',
  geo: { lat: 38.1738, lng: 20.4884 }, // Argostoli, Kefalonia
  // Keyless place embed by CID (0x9d6491d5aaf53c23) — shows the business info card, not a bare pin.
  mapEmbed: 'https://maps.google.com/maps?cid=11341350108508011555&z=17&output=embed',
  // Direct link to the Google Business Profile (opens the "Analysis" listing in Google Maps).
  mapLink:
    'https://www.google.com/maps/place/Analysis/@38.175695,20.489899,17z/data=!4m15!1m8!3m7!1s0x135d87bb94f8d999:0x25439d7c0f4bb8ea!2zzprOrc-BzrrPhc-BzrHPgiAzLCDOkc-BzrPOv8-Dz4TPjM67zrkgMjgxIDAw!3b1!8m2!3d38.1756597!4d20.4900874!16s%2Fg%2F11qswm26sl!3m5!1s0x135d87bb94328245:0x9d6491d5aaf53c23!8m2!3d38.1755868!4d20.4897291!16s%2Fg%2F11f32zgx45',
} as const;

export interface QA {
  q: string;
  a: string;
}

export interface ServiceStep {
  title: string;
  text: string;
}

/** Full content for one /services/[slug] detail page (also feeds the hub + home cards). */
export interface ServiceDetail {
  slug: ServiceSlug;
  navLabel: string; // short label (hub card / related link)
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string; // one-liner for hub/home cards
  cardImage: string; // landscape image for hub/home cards
  image: string; // detail-page figure
  imageAlt: string;
  overview: string; // lead paragraph(s) on the detail page
  cover: string[]; // "what we cover" bullets
  steps: ServiceStep[]; // "how it works"
  safety: string; // certification / safety note
  faq: QA[];
  relatedSlug: ServiceSlug; // related service to cross-link
}

/** Repeated section headings on service detail pages (kept out of each service). */
export interface ServiceUi {
  overviewHeading: string;
  coverHeading: string;
  stepsHeading: string;
  safetyHeading: string;
  faqHeading: string;
  relatedHeading: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export interface FaqContent {
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  groups: { category: string; items: QA[] }[];
}

export interface Dictionary {
  htmlLang: string;
  dir: 'ltr';
  brand: string;
  langName: string; // name of THIS language, shown in switcher lists
  switchToLabel: string; // label of the OTHER language (shown in the header toggle)
  nav: { home: string; services: string; faq: string; contact: string };
  header: { callLabel: string };
  footer: {
    address: string;
    sitemap: string;
    chooseLanguage: string;
    copyright: string;
  };
  meta: {
    home: { title: string; description: string };
    services: { title: string; description: string };
    faq: { title: string; description: string };
    contact: { title: string; description: string };
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    btnServices: string;
    btnContact: string;
    scrollCue: string;
    trust: { title: string; text: string }[];
    servicesEyebrow: string;
    servicesTitle: string;
    servicesIntro: string;
    cardCta: string;
    cards: { id: PageKey | string; title: string; image: string }[];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutLead: string;
    aboutText: string;
    aboutCta: string;
    stats: { value: string; label: string }[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  services: {
    heroTitle: string;
    eyebrow: string;
    subtitle: string;
    hubCta: string; // "Learn more" on hub cards
    items: ServiceDetail[];
  };
  serviceUi: ServiceUi;
  faqPage: FaqContent;
  contact: {
    heroTitle: string;
    subtitle: string;
    getInTouch: string;
    infoEyebrow: string;
    numbersLabel: string;
    shopLabel: string;
    mobileLabel: string;
    emailLabel: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hoursWeek: string;
    hoursSunday: string;
    mapTitle: string;
    mapCta: string;
    form: {
      eyebrow: string;
      title: string;
      intro: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      optional: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    htmlLang: 'en',
    dir: 'ltr',
    brand: 'ANALYSIS',
    langName: 'English',
    switchToLabel: 'Ελληνικά',
    nav: { home: 'Home', services: 'Services', faq: 'FAQ', contact: 'Contact' },
    header: { callLabel: 'Call' },
    footer: {
      address: 'Kerkiras 3 , Argostoli , Kefalonia 28100',
      sitemap: 'Site Map',
      chooseLanguage: 'Choose a language',
      copyright: 'Copyright © 2023 ANALYSIS | Created by Dionysios Polyzos',
    },
    meta: {
      home: {
        title: 'ANALYSIS – Pest control – Disinfection from pathogens',
        description:
          '30 years in the area of pest control and chemical analysis in Kefalonia by Chemist-Oenologist Iakovos Polyzos',
      },
      services: {
        title: 'Services – ANALYSIS Kefalonia',
        description:
          'Pest control, chemical analysis and disinfection from pathogens across Kefalonia and Ithaca.',
      },
      faq: {
        title: 'FAQ – ANALYSIS Kefalonia',
        description:
          'Frequently asked questions about pest control, chemical analysis, disinfection and wine analysis in Kefalonia and Ithaca.',
      },
      contact: {
        title: 'Contact – ANALYSIS Kefalonia',
        description:
          'Get in touch with ANALYSIS in Argostoli, Kefalonia — phone, email, address and business hours.',
      },
    },
    home: {
      heroTitle: 'PEST CONTROL & CHEMICAL ANALYSIS',
      heroSubtitle:
        '30 years in the area of pest control and chemical analysis in Kefalonia by Chemist-Oenologist Iakovos Polyzos',
      btnServices: 'Our services',
      btnContact: 'Contact us',
      scrollCue: 'Scroll to explore',
      trust: [
        {
          title: 'Certified & licensed',
          text: 'Approved substances certified by the Ministry of Rural Development & ΕΟΦ.',
        },
        {
          title: 'Safe applications',
          text: 'Carried out with minimal disruption and the greatest possible safety for occupants.',
        },
        {
          title: '30 years of experience',
          text: 'Three decades serving homes and businesses across the islands.',
        },
        {
          title: 'Local coverage',
          text: 'On hand across Kefalonia and Ithaca whenever you need us.',
        },
      ],
      servicesEyebrow: 'What we do',
      servicesTitle: 'Our services',
      servicesIntro:
        'Specialist pest control, laboratory analysis and disinfection — for homes and businesses across Kefalonia and Ithaca.',
      cardCta: 'Learn more',
      cards: [
        { id: 'pest', title: 'Pest control', image: '/images/pest-control.webp' },
        { id: 'chem', title: 'Chemical Analysis', image: '/images/chemical-analysis.webp' },
        { id: 'disinfection', title: 'Disinfection from pathogens', image: '/images/disinfection.webp' },
      ],
      aboutEyebrow: 'About us',
      aboutTitle: 'A few words about us',
      aboutLead: 'Consistency, respect and experience — for nearly three decades.',
      aboutText:
        'For about three decades, we have been offering our services continuously, in Kefalonia and Ithaca. Our regular and new customers are the confirmation that our efforts are in the right direction. With consistency, respect and experience we continue …',
      aboutCta: 'Get in touch',
      stats: [
        { value: '30+', label: 'Years of experience' },
        { value: '2', label: 'Islands covered — Kefalonia & Ithaca' },
        { value: 'ΕΟΦ', label: 'Certified & approved methods' },
      ],
      ctaTitle: 'More questions',
      ctaText:
        'If you have any questions about the services we offer please call us on the following number.',
      ctaButton: 'Call now',
    },
    services: {
      heroTitle: 'Services',
      eyebrow: 'Our services',
      subtitle:
        'From pest control to laboratory analysis and certified disinfection — practical solutions, delivered safely.',
      hubCta: 'Learn more',
      items: [
        {
          slug: 'pest-control',
          navLabel: 'Pest Control',
          metaTitle: 'Pest Control – ANALYSIS Kefalonia',
          metaDescription:
            'Rodent and insect control for homes and businesses in Kefalonia & Ithaca, using Ministry- and ΕΟΦ-approved substances, applied safely.',
          eyebrow: 'Pest Control',
          title: 'Pest Control & Pest Management',
          intro: 'Rodent and insect control for homes and businesses, applied safely.',
          cardImage: '/images/pest-control.webp',
          image: '/images/service-pest-control.webp',
          imageAlt: 'Close-up of a rodent — pest control services',
          overview:
            'We provide pest control for the rodents and insects that affect health and comfort in both homes and businesses. Every application is planned to cause the least possible disruption to occupants while ensuring the greatest possible safety. We use modern substances approved and certified by the Ministry of Rural Development & Food and the ΕΟΦ.',
          cover: [
            'Rodents (rats and mice)',
            'Crawling insects such as cockroaches and ants',
            'Flying insects [confirm exact pests covered, e.g. mosquitoes, flies, wasps]',
            'Homes, apartment buildings and holiday properties',
            'Shops, restaurants, hotels and other businesses',
          ],
          steps: [
            { title: 'Inspection', text: 'We assess the property, identify the pest and locate the source of the problem.' },
            { title: 'Tailored plan', text: 'We choose the right approved method and schedule the application around you.' },
            { title: 'Safe application', text: 'We treat the area with minimal disruption and full safety precautions for occupants.' },
            { title: 'Follow-up', text: 'We advise on prevention and arrange any follow-up visits needed.' },
          ],
          safety:
            'Our company uses only modern substances approved and certified by the Ministry of Rural Development & Food and the ΕΟΦ, applied by experienced staff under controlled conditions.',
          faq: [
            { q: 'Is the treatment safe for children and pets?', a: 'Yes — we use approved substances and take full safety precautions. We advise on any short period to keep children or pets away from treated areas. [confirm wording with client]' },
            { q: 'Do you serve businesses as well as homes?', a: 'Yes. We work with homes, apartment buildings and holiday properties as well as shops, restaurants, hotels and other businesses.' },
            { q: 'Do you cover Ithaca?', a: 'Yes — we serve both Kefalonia and Ithaca.' },
          ],
          relatedSlug: 'disinfection',
        },
        {
          slug: 'chemical-analysis',
          navLabel: 'Chemical Analysis',
          metaTitle: 'Chemical Analysis – ANALYSIS Kefalonia',
          metaDescription:
            'Laboratory analysis of water, oil, must and wine in Kefalonia, by Chemist-Oenologist Iakovos Polyzos.',
          eyebrow: 'Chemical Analysis',
          title: 'Chemical & Laboratory Analysis',
          intro: 'Analysis of water, oil, must and wine — with a specialisation in oenology.',
          cardImage: '/images/chemical-analysis.webp',
          image: '/images/service-chemical-analysis.webp',
          imageAlt: 'Laboratory glassware — chemical analysis services',
          overview:
            'We carry out chemical analysis of drinking and pool water, oil and other samples. We have a particular specialisation in oenology: we analyse must and wine and provide the right oenological substances for the best possible maturation process.',
          cover: [
            'Drinking water and pool water',
            'Olive oil [confirm which oil parameters are tested]',
            'Must and wine analysis',
            'Oenological guidance and substances',
            'Other samples on request',
          ],
          steps: [
            { title: 'Sampling', text: 'We advise how to take a representative sample, or collect it for you.' },
            { title: 'Laboratory analysis', text: 'We run the appropriate tests for your sample and purpose.' },
            { title: 'Results & advice', text: 'We explain the results clearly and recommend any next steps.' },
          ],
          safety:
            'Analysis is performed by Chemist-Oenologist Iakovos Polyzos, with nearly three decades of experience serving Kefalonia and Ithaca.',
          faq: [
            { q: 'Can you test my drinking or well water?', a: 'Yes — we analyse drinking and pool water. [confirm exact parameters offered]' },
            { q: 'Do you analyse wine and must?', a: 'Yes. Oenology is a specialisation — see our dedicated Wine & Oenology page for details.' },
            { q: 'How long do results take?', a: '[confirm typical turnaround time with client]' },
          ],
          relatedSlug: 'wine-analysis',
        },
        {
          slug: 'disinfection',
          navLabel: 'Disinfection',
          metaTitle: 'Disinfection from Pathogens – ANALYSIS Kefalonia',
          metaDescription:
            'Disinfection of premises with approved microbicidal substances and electric nebulisers, in Kefalonia & Ithaca.',
          eyebrow: 'Disinfection',
          title: 'Disinfection from Pathogens',
          intro: 'Microbicidal disinfection of premises, applied safely and under control.',
          cardImage: '/images/disinfection.webp',
          image: '/images/disinfection.webp',
          imageAlt: 'Disinfection of premises with nebulizer equipment',
          overview:
            'The need to disinfect premises carrying a microbial load became especially clear during the coronavirus pandemic. We carry out disinfection with specially approved microbicidal substances, applied with a suitable electric nebuliser in a controlled and safe way.',
          cover: [
            'Homes and apartment buildings',
            'Shops, offices and other businesses',
            'Hospitality and food-service premises',
            'Vehicles and enclosed spaces [confirm]',
          ],
          steps: [
            { title: 'Assessment', text: 'We evaluate the space and the level of microbial load to treat.' },
            { title: 'Nebuliser application', text: 'We disperse approved microbicidal substances evenly using an electric nebuliser.' },
            { title: 'Safe re-entry', text: 'We advise on a short, safe waiting period before the space is used again.' },
          ],
          safety:
            'We use only specially approved microbicidal substances, applied under controlled conditions for the safety of everyone using the space.',
          faq: [
            { q: 'What kind of spaces can you disinfect?', a: 'Homes, businesses, hospitality and food-service premises, and enclosed spaces. [confirm scope]' },
            { q: 'How soon can a space be used again?', a: 'We advise a short waiting period after treatment. [confirm typical time]' },
            { q: 'Are the substances safe?', a: 'We use only specially approved microbicidal substances, applied in a controlled and safe way.' },
          ],
          relatedSlug: 'pest-control',
        },
        {
          slug: 'wine-analysis',
          navLabel: 'Wine & Oenology',
          metaTitle: 'Wine & Oenology Analysis – ANALYSIS Kefalonia',
          metaDescription:
            'Must and wine analysis and oenological guidance for Kefalonia winemakers, by Chemist-Oenologist Iakovos Polyzos.',
          eyebrow: 'Wine & Oenology',
          title: 'Wine & Oenology Analysis',
          intro: 'Must and wine analysis and oenological guidance for local winemakers.',
          cardImage: '/images/wine-grapes.webp',
          image: '/images/wine-vineyard.webp',
          imageAlt: 'Rows of grapevines in a hillside vineyard',
          overview:
            'ANALYSIS is run by Chemist-Oenologist Iakovos Polyzos. Alongside our general laboratory work, we offer dedicated support to local winemakers — analysing must and wine and providing the right oenological substances for the best possible maturation. It’s a natural fit for Kefalonia, home of the Robola variety.',
          cover: [
            'Must analysis to support harvest-timing decisions',
            'Wine analysis through vinification [confirm exact measurements offered]',
            'Supply of the appropriate oenological substances',
            'Practical oenological guidance from a qualified oenologist',
            'For small and family wineries and growers who vinify their own grapes',
          ],
          steps: [
            { title: 'Sampling', text: 'We advise how to take a representative must or wine sample, or collect it for you.' },
            { title: 'Laboratory analysis', text: 'We run the appropriate oenological analyses for your sample and stage of production.' },
            { title: 'Guidance', text: 'We explain the results and recommend the right substances and next steps for the best maturation.' },
          ],
          safety:
            'Analysis and guidance are provided by Chemist-Oenologist Iakovos Polyzos, with nearly three decades of experience serving Kefalonia and Ithaca.',
          faq: [
            { q: 'What can you measure in must and wine?', a: '[confirm the exact parameters offered — e.g. sugar, acidity, alcohol]' },
            { q: 'Can you advise on harvest timing?', a: 'Yes — must analysis helps inform decisions on when to harvest and how to manage maturation.' },
            { q: 'Do you supply oenological substances?', a: 'Yes — we provide the appropriate substances for the best possible maturation process.' },
          ],
          relatedSlug: 'chemical-analysis',
        },
      ],
    },
    serviceUi: {
      overviewHeading: 'Overview',
      coverHeading: 'What we cover',
      stepsHeading: 'How it works',
      safetyHeading: 'Certified & safe',
      faqHeading: 'Common questions',
      relatedHeading: 'Related service',
      ctaTitle: 'Need this service?',
      ctaText: 'Tell us what you need and we’ll get back to you quickly with practical advice.',
      ctaButton: 'Contact us',
    },
    faqPage: {
      navLabel: 'FAQ',
      metaTitle: 'FAQ – ANALYSIS Kefalonia',
      metaDescription:
        'Frequently asked questions about pest control, chemical analysis, disinfection and wine analysis in Kefalonia and Ithaca.',
      eyebrow: 'Help & answers',
      title: 'Frequently asked questions',
      subtitle: 'Quick answers about our services across Kefalonia and Ithaca. Can’t find yours? Just get in touch.',
      groups: [
        {
          category: 'General',
          items: [
            { q: 'Where do you operate?', a: 'We serve the whole of Kefalonia and Ithaca, based in Argostoli.' },
            { q: 'How long have you been in business?', a: 'For nearly three decades — around 30 years of continuous service.' },
            { q: 'How do I get a quote?', a: 'Call us or use the contact form with a few details about what you need, and we’ll get back to you. [confirm whether quotes are free]' },
          ],
        },
        {
          category: 'Pest control',
          items: [
            { q: 'Is treatment safe for children and pets?', a: 'Yes — we use approved substances and full safety precautions, and advise on any short period to keep children or pets away from treated areas.' },
            { q: 'Do you work with businesses?', a: 'Yes — homes and businesses alike, including shops, restaurants and hotels.' },
          ],
        },
        {
          category: 'Chemical analysis & wine',
          items: [
            { q: 'What can you analyse?', a: 'Drinking and pool water, oil, and must and wine, among other samples.' },
            { q: 'Do you offer wine analysis?', a: 'Yes — oenology is a specialisation. See the Wine & Oenology page.' },
            { q: 'How long do results take?', a: '[confirm typical turnaround time with client]' },
          ],
        },
        {
          category: 'Disinfection',
          items: [
            { q: 'What spaces can you disinfect?', a: 'Homes, businesses and enclosed spaces, using approved microbicidal substances and an electric nebuliser.' },
            { q: 'How soon can the space be used again?', a: 'We advise a short waiting period after treatment. [confirm typical time]' },
          ],
        },
      ],
    },
    contact: {
      heroTitle: 'Contact',
      subtitle: "We're here to help — reach us by phone, email or the form below.",
      getInTouch: 'Get in Touch',
      infoEyebrow: 'Contact details',
      numbersLabel: 'Numbers',
      shopLabel: 'Shop number',
      mobileLabel: 'Mobile number',
      emailLabel: 'Email',
      addressLabel: 'Address',
      address: 'Kerkiras 3, Argostoli , Kefalonia 28100',
      hoursLabel: 'Business Hours',
      hoursWeek: 'Monday — Saturday 8am – 2pm',
      hoursSunday: 'Sunday — Closed',
      mapTitle: 'Map of ANALYSIS, Kerkiras 3, Argostoli, Kefalonia',
      mapCta: 'View on Google Maps',
      form: {
        eyebrow: 'Send a message',
        title: 'Send us a message',
        intro: "Tell us what you need and we'll get back to you as soon as we can.",
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        optional: 'optional',
        submit: 'Send message',
        sending: 'Sending…',
        success: "Thanks! Your message has been sent — we'll be in touch shortly.",
        error: 'Something went wrong. Please call or email us instead.',
      },
    },
  },

  el: {
    htmlLang: 'el',
    dir: 'ltr',
    brand: 'ANALYSIS',
    langName: 'Ελληνικά',
    switchToLabel: 'English',
    nav: { home: 'Αρχική', services: 'Υπηρεσίες', faq: 'Συχνές ερωτήσεις', contact: 'Επικοινωνία' },
    header: { callLabel: 'Καλέστε' },
    footer: {
      address: 'Κερκύρας 3 , Αργοστόλι , Κεφαλονιά 28100',
      sitemap: 'Χάρτης ιστότοπου',
      chooseLanguage: 'Επιλογή γλώσσας',
      copyright: 'Copyright © 2023 ANALYSIS | Created by Dionysios Polyzos',
    },
    meta: {
      home: {
        title: 'ANALYSIS – Απολυμάνσεις – Απεντομώσεις – Χημικές αναλύσεις',
        description:
          '30 χρόνια στον χώρο των απολυμάνσεων και των χημικών αναλύσεων στην Κεφαλονιά από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο',
      },
      services: {
        title: 'Υπηρεσίες – ANALYSIS Κεφαλονιά',
        description:
          'Απολυμάνσεις, απεντομώσεις, χημικές αναλύσεις και απολύμανση παθογόνων μικροοργανισμών σε Κεφαλονιά και Ιθάκη.',
      },
      faq: {
        title: 'Συχνές ερωτήσεις – ANALYSIS Κεφαλονιά',
        description:
          'Συχνές ερωτήσεις για τις απολυμάνσεις, τις χημικές αναλύσεις, τις μικροβιοκτονίες και τις οινολογικές αναλύσεις σε Κεφαλονιά και Ιθάκη.',
      },
      contact: {
        title: 'Επικοινωνία – ANALYSIS Κεφαλονιά',
        description:
          'Επικοινωνήστε με την ANALYSIS στο Αργοστόλι Κεφαλονιάς — τηλέφωνα, email, διεύθυνση και ώρες λειτουργίας.',
      },
    },
    home: {
      heroTitle: 'ΑΠΟΛΥΜΑΝΣΕΙΣ - ΑΠΕΝΤΟΜΩΣΕΙΣ - ΧΗΜΙΚΕΣ ΑΝΑΛΥΣΕΙΣ',
      heroSubtitle:
        '30 χρόνια στον χώρο των απολυμάνσεων και των χημικών αναλύσεων στην Κεφαλονιά από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο',
      btnServices: 'Οι υπηρεσίες μας',
      btnContact: 'Επικοινωνία',
      scrollCue: 'Δείτε περισσότερα',
      trust: [
        {
          title: 'Πιστοποίηση & άδεια',
          text: 'Εγκεκριμένα σκευάσματα με πιστοποίηση από το Υπουργείο Αγροτικής Ανάπτυξης & τον ΕΟΦ.',
        },
        {
          title: 'Ασφαλείς εφαρμογές',
          text: 'Με την ελάχιστη δυνατή ενόχληση και τη μέγιστη δυνατή ασφάλεια για τους ενοίκους.',
        },
        {
          title: '30 χρόνια εμπειρίας',
          text: 'Τρεις δεκαετίες δίπλα σε σπίτια και επιχειρήσεις στα νησιά.',
        },
        {
          title: 'Τοπική κάλυψη',
          text: 'Κοντά σας σε Κεφαλονιά και Ιθάκη, όποτε μας χρειαστείτε.',
        },
      ],
      servicesEyebrow: 'Τι κάνουμε',
      servicesTitle: 'Οι υπηρεσίες μας',
      servicesIntro:
        'Εξειδικευμένες απολυμάνσεις, εργαστηριακές αναλύσεις και μικροβιοκτονίες — για σπίτια και επιχειρήσεις σε Κεφαλονιά και Ιθάκη.',
      cardCta: 'Μάθετε περισσότερα',
      cards: [
        { id: 'pest', title: 'Απολυμάνσεις - Απεντομώσεις', image: '/images/pest-control.webp' },
        { id: 'chem', title: 'Χημικές αναλύσεις', image: '/images/chemical-analysis.webp' },
        { id: 'disinfection', title: 'Απολύμανση Παθογόνων Μικροοργανισμών', image: '/images/disinfection.webp' },
      ],
      aboutEyebrow: 'Σχετικά με εμάς',
      aboutTitle: 'Λίγα λόγια για εμάς',
      aboutLead: 'Συνέπεια, σεβασμός και εμπειρία — για σχεδόν τρεις δεκαετίες.',
      aboutText:
        'Για περίπου τρεις δεκαετίες προσφέρουμε συνεχώς τις υπηρεσίες μας σε Κεφαλονιά και Ιθάκη.Οι σταθεροί αλλά και οι νέοι πελάτες μας είναι η επιβεβαίωση ότι οι προσπάθειές μας βρίσκονται στην σωστή κατεύθυνση.Με συνέπεια, σεβασμό και εμπειρία συνεχίζουμε…',
      aboutCta: 'Επικοινωνήστε',
      stats: [
        { value: '30+', label: 'Χρόνια εμπειρίας' },
        { value: '2', label: 'Νησιά — Κεφαλονιά & Ιθάκη' },
        { value: 'ΕΟΦ', label: 'Πιστοποιημένες μέθοδοι' },
      ],
      ctaTitle: 'Περισσότερες ερωτήσεις',
      ctaText:
        'Εάν έχετε οποιαδήποτε ερώτηση για τις υπηρεσίες που προσφέρουμε παρακαλώ επικοινωνήστε μαζί μας στο παρακάτω νούμερο',
      ctaButton: '6950300324',
    },
    services: {
      heroTitle: 'ΥΠΗΡΕΣΙΕΣ',
      eyebrow: 'Οι υπηρεσίες μας',
      subtitle:
        'Από τις απολυμάνσεις έως τις εργαστηριακές αναλύσεις και τις πιστοποιημένες μικροβιοκτονίες — πρακτικές λύσεις, με ασφάλεια.',
      hubCta: 'Μάθετε περισσότερα',
      items: [
        {
          slug: 'pest-control',
          navLabel: 'Απεντομώσεις',
          metaTitle: 'Απεντομώσεις & Μυοκτονίες – ANALYSIS Κεφαλονιά',
          metaDescription:
            'Καταπολέμηση τρωκτικών και εντόμων για οικίες και επιχειρήσεις σε Κεφαλονιά & Ιθάκη, με εγκεκριμένα σκευάσματα Υπουργείου & ΕΟΦ, με ασφάλεια.',
          eyebrow: 'Απεντομώσεις',
          title: 'Απεντομώσεις & Μυοκτονίες',
          intro: 'Καταπολέμηση τρωκτικών και εντόμων για οικίες και επιχειρήσεις, με ασφάλεια.',
          cardImage: '/images/pest-control.webp',
          image: '/images/service-pest-control.webp',
          imageAlt: 'Τρωκτικό σε κοντινό πλάνο — υπηρεσίες απεντόμωσης',
          overview:
            'Προσφέρουμε εφαρμογές για την καταπολέμηση τρωκτικών και εντόμων υγειονομικής σημασίας, τόσο σε οικίες όσο και σε επαγγελματικούς χώρους. Κάθε εφαρμογή σχεδιάζεται ώστε να υπάρχει η μικρότερη δυνατή ενόχληση των ενοίκων, λαμβάνοντας όλα τα απαραίτητα μέτρα ασφάλειας. Χρησιμοποιούμε σύγχρονα σκευάσματα, με πιστοποίηση και άδεια κυκλοφορίας από το Υπουργείο Αγροτικής Ανάπτυξης & Τροφίμων και τον ΕΟΦ.',
          cover: [
            'Τρωκτικά (αρουραίοι και ποντίκια)',
            'Έρποντα έντομα, όπως κατσαρίδες και μυρμήγκια',
            'Ιπτάμενα έντομα [επιβεβαίωση: κουνούπια, μύγες, σφήκες κ.λπ.]',
            'Οικίες, πολυκατοικίες και εξοχικά',
            'Καταστήματα, εστιατόρια, ξενοδοχεία και άλλες επιχειρήσεις',
          ],
          steps: [
            { title: 'Επιθεώρηση', text: 'Αξιολογούμε τον χώρο, αναγνωρίζουμε τον στόχο και εντοπίζουμε την πηγή του προβλήματος.' },
            { title: 'Εξατομικευμένο πλάνο', text: 'Επιλέγουμε την κατάλληλη εγκεκριμένη μέθοδο και προγραμματίζουμε την εφαρμογή γύρω από εσάς.' },
            { title: 'Ασφαλής εφαρμογή', text: 'Πραγματοποιούμε την εφαρμογή με την ελάχιστη ενόχληση και πλήρη μέτρα ασφάλειας για τους ενοίκους.' },
            { title: 'Παρακολούθηση', text: 'Σας συμβουλεύουμε για την πρόληψη και κανονίζουμε τυχόν επαναληπτικές επισκέψεις.' },
          ],
          safety:
            'Η εταιρία μας χρησιμοποιεί αποκλειστικά σύγχρονα σκευάσματα, εγκεκριμένα και πιστοποιημένα από το Υπουργείο Αγροτικής Ανάπτυξης & Τροφίμων και τον ΕΟΦ, από έμπειρο προσωπικό υπό ελεγχόμενες συνθήκες.',
          faq: [
            { q: 'Είναι ασφαλής η εφαρμογή για παιδιά και κατοικίδια;', a: 'Ναι — χρησιμοποιούμε εγκεκριμένα σκευάσματα και λαμβάνουμε όλα τα μέτρα ασφάλειας. Σας ενημερώνουμε για το σύντομο διάστημα αποφυγής των χώρων που έχουν υποστεί εφαρμογή. [επιβεβαίωση διατύπωσης με πελάτη]' },
            { q: 'Εξυπηρετείτε και επιχειρήσεις;', a: 'Ναι. Εργαζόμαστε με οικίες, πολυκατοικίες και εξοχικά, καθώς και με καταστήματα, εστιατόρια, ξενοδοχεία και άλλες επιχειρήσεις.' },
            { q: 'Καλύπτετε την Ιθάκη;', a: 'Ναι — εξυπηρετούμε τόσο την Κεφαλονιά όσο και την Ιθάκη.' },
          ],
          relatedSlug: 'disinfection',
        },
        {
          slug: 'chemical-analysis',
          navLabel: 'Χημικές αναλύσεις',
          metaTitle: 'Χημικές Αναλύσεις – ANALYSIS Κεφαλονιά',
          metaDescription:
            'Εργαστηριακές αναλύσεις νερού, λαδιού, μούστου και κρασιού στην Κεφαλονιά, από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο.',
          eyebrow: 'Χημικές αναλύσεις',
          title: 'Χημικές & Εργαστηριακές Αναλύσεις',
          intro: 'Αναλύσεις νερού, λαδιού, μούστου και κρασιού — με εξειδίκευση στην οινολογία.',
          cardImage: '/images/chemical-analysis.webp',
          image: '/images/service-chemical-analysis.webp',
          imageAlt: 'Εργαστηριακά σκεύη — υπηρεσίες χημικών αναλύσεων',
          overview:
            'Πραγματοποιούμε χημικές αναλύσεις σε πόσιμο νερό και νερό πισίνας, λάδι και άλλα δείγματα. Διαθέτουμε ιδιαίτερη εξειδίκευση στην οινολογία: αναλύουμε δείγματα μούστου και κρασιού και χορηγούμε τις κατάλληλες οινολογικές ουσίες για την καλύτερη δυνατή ωρίμανση.',
          cover: [
            'Πόσιμο νερό και νερό πισίνας',
            'Ελαιόλαδο [επιβεβαίωση: ποιες παράμετροι λαδιού ελέγχονται]',
            'Αναλύσεις μούστου και κρασιού',
            'Οινολογική καθοδήγηση και ουσίες',
            'Άλλα δείγματα κατόπιν αιτήματος',
          ],
          steps: [
            { title: 'Δειγματοληψία', text: 'Σας καθοδηγούμε για τη σωστή λήψη αντιπροσωπευτικού δείγματος ή το συλλέγουμε εμείς.' },
            { title: 'Εργαστηριακή ανάλυση', text: 'Εκτελούμε τις κατάλληλες αναλύσεις ανάλογα με το δείγμα και τον σκοπό.' },
            { title: 'Αποτελέσματα & συμβουλές', text: 'Σας εξηγούμε με σαφήνεια τα αποτελέσματα και προτείνουμε τα επόμενα βήματα.' },
          ],
          safety:
            'Οι αναλύσεις πραγματοποιούνται από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο, με σχεδόν τρεις δεκαετίες εμπειρίας σε Κεφαλονιά και Ιθάκη.',
          faq: [
            { q: 'Μπορείτε να αναλύσετε το πόσιμο νερό ή το νερό της γεώτρησής μου;', a: 'Ναι — αναλύουμε πόσιμο νερό και νερό πισίνας. [επιβεβαίωση: ακριβείς παράμετροι]' },
            { q: 'Αναλύετε κρασί και μούστο;', a: 'Ναι. Η οινολογία είναι εξειδίκευσή μας — δείτε την αφιερωμένη σελίδα Οινολογίας.' },
            { q: 'Πόσο χρόνο χρειάζονται τα αποτελέσματα;', a: '[επιβεβαίωση: συνήθης χρόνος παράδοσης με πελάτη]' },
          ],
          relatedSlug: 'wine-analysis',
        },
        {
          slug: 'disinfection',
          navLabel: 'Μικροβιοκτονίες',
          metaTitle: 'Απολύμανση Παθογόνων Μικροοργανισμών – ANALYSIS Κεφαλονιά',
          metaDescription:
            'Απολύμανση χώρων με εγκεκριμένα μικροβιοκτόνα σκευάσματα και ηλεκτρικό νεφελοποιητή, σε Κεφαλονιά & Ιθάκη.',
          eyebrow: 'Μικροβιοκτονίες',
          title: 'Απολύμανση Παθογόνων Μικροοργανισμών',
          intro: 'Μικροβιοκτόνος απολύμανση χώρων, με ασφάλεια και έλεγχο.',
          cardImage: '/images/disinfection.webp',
          image: '/images/disinfection.webp',
          imageAlt: 'Απολύμανση χώρου με νεφελοποιητή',
          overview:
            'Η ανάγκη για απολύμανση χώρων επιβαρυμένων με μικροβιακό φορτίο έγινε ιδιαίτερα φανερή κατά τη διάρκεια της πανδημίας του κορονοϊού. Πραγματοποιούμε απολύμανση με ειδικά εγκεκριμένα μικροβιοκτόνα σκευάσματα, με τη χρήση κατάλληλου ηλεκτρικού νεφελοποιητή, με ελεγχόμενο και ασφαλή τρόπο.',
          cover: [
            'Οικίες και πολυκατοικίες',
            'Καταστήματα, γραφεία και άλλες επιχειρήσεις',
            'Χώροι φιλοξενίας και εστίασης',
            'Οχήματα και κλειστοί χώροι [επιβεβαίωση]',
          ],
          steps: [
            { title: 'Αξιολόγηση', text: 'Εκτιμούμε τον χώρο και το επίπεδο του μικροβιακού φορτίου προς αντιμετώπιση.' },
            { title: 'Εφαρμογή με νεφελοποιητή', text: 'Διασπείρουμε ομοιόμορφα τα εγκεκριμένα μικροβιοκτόνα σκευάσματα με ηλεκτρικό νεφελοποιητή.' },
            { title: 'Ασφαλής επανείσοδος', text: 'Σας ενημερώνουμε για το σύντομο, ασφαλές διάστημα αναμονής πριν τη χρήση του χώρου.' },
          ],
          safety:
            'Χρησιμοποιούμε αποκλειστικά ειδικά εγκεκριμένα μικροβιοκτόνα σκευάσματα, με ελεγχόμενο τρόπο, για την ασφάλεια όλων όσων χρησιμοποιούν τον χώρο.',
          faq: [
            { q: 'Τι είδους χώρους απολυμαίνετε;', a: 'Οικίες, επιχειρήσεις, χώρους φιλοξενίας και εστίασης, καθώς και κλειστούς χώρους. [επιβεβαίωση εύρους]' },
            { q: 'Πόσο σύντομα μπορεί να χρησιμοποιηθεί ξανά ο χώρος;', a: 'Προτείνουμε ένα σύντομο διάστημα αναμονής μετά την εφαρμογή. [επιβεβαίωση: συνήθης χρόνος]' },
            { q: 'Είναι ασφαλή τα σκευάσματα;', a: 'Χρησιμοποιούμε αποκλειστικά ειδικά εγκεκριμένα μικροβιοκτόνα σκευάσματα, με ελεγχόμενο και ασφαλή τρόπο.' },
          ],
          relatedSlug: 'pest-control',
        },
        {
          slug: 'wine-analysis',
          navLabel: 'Οινολογία',
          metaTitle: 'Οινολογικές Αναλύσεις – ANALYSIS Κεφαλονιά',
          metaDescription:
            'Αναλύσεις μούστου και κρασιού και οινολογική καθοδήγηση για τους οινοποιούς της Κεφαλονιάς, από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο.',
          eyebrow: 'Οινολογία',
          title: 'Οινολογικές Αναλύσεις',
          intro: 'Αναλύσεις μούστου και κρασιού και οινολογική καθοδήγηση για τους τοπικούς οινοποιούς.',
          cardImage: '/images/wine-grapes.webp',
          image: '/images/wine-vineyard.webp',
          imageAlt: 'Σειρές αμπελιών σε λοφώδη αμπελώνα',
          overview:
            'Η ANALYSIS λειτουργεί υπό τον Χημικό-Οινολόγο Ιάκωβο Πολύζο. Πέρα από τις γενικές εργαστηριακές μας εργασίες, προσφέρουμε αφιερωμένη υποστήριξη στους τοπικούς οινοποιούς — αναλύουμε μούστο και κρασί και χορηγούμε τις κατάλληλες οινολογικές ουσίες για την καλύτερη δυνατή ωρίμανση. Μια φυσική επιλογή για την Κεφαλονιά, πατρίδα της ποικιλίας Ρομπόλα.',
          cover: [
            'Ανάλυση μούστου για τη στήριξη αποφάσεων σχετικά με τον χρόνο τρύγου',
            'Ανάλυση κρασιού κατά την οινοποίηση [επιβεβαίωση: ακριβείς μετρήσεις]',
            'Χορήγηση των κατάλληλων οινολογικών ουσιών',
            'Πρακτική οινολογική καθοδήγηση από εξειδικευμένο οινολόγο',
            'Για μικρά και οικογενειακά οινοποιεία και παραγωγούς που οινοποιούν οι ίδιοι',
          ],
          steps: [
            { title: 'Δειγματοληψία', text: 'Σας καθοδηγούμε για τη λήψη αντιπροσωπευτικού δείγματος μούστου ή κρασιού ή το συλλέγουμε εμείς.' },
            { title: 'Εργαστηριακή ανάλυση', text: 'Εκτελούμε τις κατάλληλες οινολογικές αναλύσεις ανάλογα με το δείγμα και το στάδιο παραγωγής.' },
            { title: 'Καθοδήγηση', text: 'Σας εξηγούμε τα αποτελέσματα και προτείνουμε τις κατάλληλες ουσίες και τα επόμενα βήματα για την καλύτερη ωρίμανση.' },
          ],
          safety:
            'Οι αναλύσεις και η καθοδήγηση παρέχονται από τον Χημικό-Οινολόγο Ιάκωβο Πολύζο, με σχεδόν τρεις δεκαετίες εμπειρίας σε Κεφαλονιά και Ιθάκη.',
          faq: [
            { q: 'Τι μπορείτε να μετρήσετε σε μούστο και κρασί;', a: '[επιβεβαίωση: ακριβείς παράμετροι — π.χ. σάκχαρα, οξύτητα, αλκοόλη]' },
            { q: 'Μπορείτε να με συμβουλέψετε για τον χρόνο τρύγου;', a: 'Ναι — η ανάλυση μούστου βοηθά στις αποφάσεις για το πότε θα γίνει ο τρύγος και πώς θα διαχειριστείτε την ωρίμανση.' },
            { q: 'Χορηγείτε οινολογικές ουσίες;', a: 'Ναι — χορηγούμε τις κατάλληλες ουσίες για την καλύτερη δυνατή διαδικασία ωρίμανσης.' },
          ],
          relatedSlug: 'chemical-analysis',
        },
      ],
    },
    serviceUi: {
      overviewHeading: 'Επισκόπηση',
      coverHeading: 'Τι καλύπτουμε',
      stepsHeading: 'Πώς γίνεται',
      safetyHeading: 'Πιστοποιημένα & ασφαλή',
      faqHeading: 'Συχνές ερωτήσεις',
      relatedHeading: 'Σχετική υπηρεσία',
      ctaTitle: 'Χρειάζεστε αυτή την υπηρεσία;',
      ctaText: 'Πείτε μας τι χρειάζεστε και θα επικοινωνήσουμε σύντομα μαζί σας με πρακτικές συμβουλές.',
      ctaButton: 'Επικοινωνία',
    },
    faqPage: {
      navLabel: 'Συχνές ερωτήσεις',
      metaTitle: 'Συχνές ερωτήσεις – ANALYSIS Κεφαλονιά',
      metaDescription:
        'Συχνές ερωτήσεις για τις απολυμάνσεις, τις χημικές αναλύσεις, τις μικροβιοκτονίες και τις οινολογικές αναλύσεις σε Κεφαλονιά και Ιθάκη.',
      eyebrow: 'Βοήθεια & απαντήσεις',
      title: 'Συχνές ερωτήσεις',
      subtitle: 'Γρήγορες απαντήσεις για τις υπηρεσίες μας σε Κεφαλονιά και Ιθάκη. Δεν βρίσκετε τη δική σας; Επικοινωνήστε μαζί μας.',
      groups: [
        {
          category: 'Γενικά',
          items: [
            { q: 'Σε ποιες περιοχές δραστηριοποιείστε;', a: 'Εξυπηρετούμε όλη την Κεφαλονιά και την Ιθάκη, με έδρα το Αργοστόλι.' },
            { q: 'Πόσα χρόνια λειτουργείτε;', a: 'Σχεδόν τρεις δεκαετίες — περίπου 30 χρόνια συνεχούς παρουσίας.' },
            { q: 'Πώς μπορώ να λάβω προσφορά;', a: 'Καλέστε μας ή χρησιμοποιήστε τη φόρμα επικοινωνίας με λίγα στοιχεία για τις ανάγκες σας και θα επικοινωνήσουμε μαζί σας. [επιβεβαίωση: αν οι προσφορές είναι δωρεάν]' },
          ],
        },
        {
          category: 'Απεντομώσεις',
          items: [
            { q: 'Είναι ασφαλής η εφαρμογή για παιδιά και κατοικίδια;', a: 'Ναι — χρησιμοποιούμε εγκεκριμένα σκευάσματα και πλήρη μέτρα ασφάλειας, και σας ενημερώνουμε για το σύντομο διάστημα αποφυγής των χώρων που έχουν υποστεί εφαρμογή.' },
            { q: 'Συνεργάζεστε με επιχειρήσεις;', a: 'Ναι — τόσο με οικίες όσο και με επιχειρήσεις, συμπεριλαμβανομένων καταστημάτων, εστιατορίων και ξενοδοχείων.' },
          ],
        },
        {
          category: 'Χημικές & οινολογικές αναλύσεις',
          items: [
            { q: 'Τι μπορείτε να αναλύσετε;', a: 'Πόσιμο νερό και νερό πισίνας, λάδι, καθώς και μούστο και κρασί, μεταξύ άλλων δειγμάτων.' },
            { q: 'Προσφέρετε ανάλυση κρασιού;', a: 'Ναι — η οινολογία είναι εξειδίκευσή μας. Δείτε τη σελίδα Οινολογίας.' },
            { q: 'Πόσο χρόνο χρειάζονται τα αποτελέσματα;', a: '[επιβεβαίωση: συνήθης χρόνος παράδοσης με πελάτη]' },
          ],
        },
        {
          category: 'Μικροβιοκτονίες',
          items: [
            { q: 'Ποιους χώρους απολυμαίνετε;', a: 'Οικίες, επιχειρήσεις και κλειστούς χώρους, με εγκεκριμένα μικροβιοκτόνα σκευάσματα και ηλεκτρικό νεφελοποιητή.' },
            { q: 'Πόσο σύντομα μπορεί να χρησιμοποιηθεί ξανά ο χώρος;', a: 'Προτείνουμε ένα σύντομο διάστημα αναμονής μετά την εφαρμογή. [επιβεβαίωση: συνήθης χρόνος]' },
          ],
        },
      ],
    },
    contact: {
      heroTitle: 'Επικοινωνία',
      subtitle: 'Είμαστε εδώ για εσάς — επικοινωνήστε τηλεφωνικά, με email ή μέσω της φόρμας.',
      getInTouch: 'Επικοινωνήστε μαζι μας',
      infoEyebrow: 'Στοιχεία επικοινωνίας',
      numbersLabel: 'Τηλέφωνα',
      shopLabel: 'Αριθμός καταστήματος',
      mobileLabel: 'Κινητά',
      emailLabel: 'Email',
      addressLabel: 'Διεύθυνση',
      address: 'Κερκύρας 3 , Αργοστόλι , Κεφαλονιά 28100',
      hoursLabel: 'Ώρες λειτουργίας',
      hoursWeek: 'Δευτέρα — Σάββατο 8 π.μ – 2 μ.μ',
      hoursSunday: 'Κυριακή — Κλειστά',
      mapTitle: 'Χάρτης ANALYSIS, Κερκύρας 3, Αργοστόλι, Κεφαλονιά',
      mapCta: 'Δείτε το στο Google Maps',
      form: {
        eyebrow: 'Στείλτε μήνυμα',
        title: 'Στείλτε μας μήνυμα',
        intro: 'Πείτε μας τι χρειάζεστε και θα επικοινωνήσουμε μαζί σας το συντομότερο.',
        name: 'Όνομα',
        email: 'Email',
        phone: 'Τηλέφωνο',
        message: 'Μήνυμα',
        optional: 'προαιρετικό',
        submit: 'Αποστολή',
        sending: 'Αποστολή…',
        success: 'Ευχαριστούμε! Το μήνυμά σας στάλθηκε — θα επικοινωνήσουμε σύντομα.',
        error: 'Κάτι πήγε στραβά. Καλέστε μας ή στείλτε μας email.',
      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
