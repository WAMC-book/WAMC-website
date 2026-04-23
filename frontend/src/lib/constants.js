// Amazon links (real)
export const AMAZON_URLS = {
  us: "https://www.amazon.com/Who-Are-My-Clients-them/dp/0995255520",
  ca: "https://www.amazon.ca/Who-Are-My-Clients-them/dp/0995255520",
};

// Kept for backward-compat imports
export const AMAZON_BOOK_URL = AMAZON_URLS.us;

// Hosted first-3-chapters PDF (in /public/assets/)
export const CHAPTERS_PDF_URL = "/assets/who-are-my-clients-first-3-chapters.pdf";

// Book metadata
export const BOOK = {
  title: "Who Are My Clients?",
  subtitle: "Do I really know who they are?",
  tagline:
    "Build a profitable company by understanding how to define, find, and attract your clients.",
  pages: 184,
  format: "Print available · Other formats coming",
  language: "English",
};

// Author
export const AUTHOR = {
  name: "Antoine B. Carrière",
  short: "Entrepreneur, coach, and facilitator.",
};

// Contact details (replace when available)
export const CONTACT = {
  email: "hello@whoaremyclients.com",
  phone: "+1 (555) 000-0000",
};

// Roles for chapter download form
export const ROLE_OPTIONS = [
  { value: "thinking-about-starting", label: "Thinking about starting a business" },
  { value: "just-launched", label: "Just launched my business" },
  { value: "early-stage", label: "Early-stage founder (0–2 years)" },
  { value: "growing", label: "Growing business owner (2+ years)" },
  { value: "solo-consultant", label: "Solo consultant / freelancer" },
  { value: "other", label: "Other" },
];

// Tools — EXACTLY as provided, do not add/invent
export const TOOLS = [
  {
    id: "client-profile",
    name: "Client profile",
    description:
      "A structured way to describe the person behind your buying decision.",
  },
  {
    id: "client-definition-framework",
    name: "Client definition framework",
    description:
      "A framework to move from a vague audience to a clear definition of your client.",
  },
  {
    id: "level-of-client-definition",
    name: "Level of client definition",
    description:
      "A way to evaluate how clearly you have defined your client today.",
  },
  {
    id: "buying-process-stages",
    name: "Buying process stages",
    description:
      "The steps your client moves through before choosing to work with you.",
  },
  {
    id: "internal-factors",
    name: "Internal factors",
    description:
      "The personal, inner forces that shape how your client decides.",
  },
  {
    id: "external-factors",
    name: "External factors",
    description:
      "The surrounding context that influences your client's buying decisions.",
  },
  {
    id: "communication-worksheet",
    name: "Communication worksheet",
    description:
      "A worksheet to align how you speak with what your client needs to hear.",
  },
  {
    id: "ideal-client-criteria",
    name: "Ideal client criteria",
    description:
      "A short checklist to identify the clients most aligned with your work.",
  },
];

// Placeholder testimonials — REPLACE with real ones when available
export const TESTIMONIALS = [
  {
    quote:
      "A calm, clear read. It made me slow down and ask better questions about who I was really building for.",
    author: "— Early reader",
    role: "Founder, service business",
  },
  {
    quote:
      "Short chapters, honest prompts. I filled the margins before I finished chapter two.",
    author: "— Early reader",
    role: "Solo consultant",
  },
  {
    quote:
      "Not another marketing book. It gave me language for something I had been feeling for a long time.",
    author: "— Early reader",
    role: "Early-stage founder",
  },
];
