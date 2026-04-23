// Amazon links (real)
export const AMAZON_URLS = {
  us: "https://www.amazon.com/Who-Are-My-Clients-them/dp/0995255520",
  ca: "https://www.amazon.ca/Who-Are-My-Clients-them/dp/0995255520",
};

// Amazon reviews — anchor to the reviews section of the product page
export const AMAZON_REVIEWS_URL =
  "https://www.amazon.com/Who-Are-My-Clients-them/product-reviews/0995255520";

// Kept for backward-compat imports
export const AMAZON_BOOK_URL = AMAZON_URLS.us;

// Hosted first-3-chapters PDF
export const CHAPTERS_PDF_URL = "/assets/who-are-my-clients-first-3-chapters.pdf";

// Book — using the official copy from the cover
export const BOOK = {
  title: "Who Are My Clients?",
  question: "How can I get them to buy from me?",
  tagline:
    "Build a profitable company by understanding how to define, find, and attract your clients.",
  subtitle: "Do I really know who they are?",
  pages: 184,
  format: "Print available · Other formats coming",
  language: "English",
};

// French versions of the book copy
export const BOOK_FR = {
  title: "Who Are My Clients?",
  question: "Comment puis-je les amener à acheter?",
  tagline:
    "Bâtissez une entreprise rentable en comprenant comment définir, trouver et attirer vos clients.",
  subtitle: "Est-ce que je les connais vraiment?",
};

// Author
export const AUTHOR = {
  name: "Antoine B. Carrière",
  short: "Entrepreneur, coach, and facilitator.",
};

// Real contact details
export const CONTACT = {
  email: "WhoAreMyClients@GABCM.ca",
  phoneLocal: "+1 (613) 421-4722 ext 1",
  phoneLocalDial: "+16134214722,,1",
  phoneToll: "+1 (844) 884-2226 ext 1",
  phoneTollDial: "+18448842226,,1",
};

// Roles for chapter download form
export const ROLE_OPTIONS_EN = [
  { value: "thinking-about-starting", label: "Thinking about starting a business" },
  { value: "just-launched", label: "Just launched my business" },
  { value: "early-stage", label: "Early-stage founder (0–2 years)" },
  { value: "growing", label: "Growing business owner (2+ years)" },
  { value: "solo-consultant", label: "Solo consultant / freelancer" },
  { value: "other", label: "Other" },
];
export const ROLE_OPTIONS_FR = [
  { value: "thinking-about-starting", label: "Je songe à me lancer en affaires" },
  { value: "just-launched", label: "Je viens de lancer mon entreprise" },
  { value: "early-stage", label: "Entrepreneur en démarrage (0–2 ans)" },
  { value: "growing", label: "Propriétaire d'entreprise en croissance (2+ ans)" },
  { value: "solo-consultant", label: "Consultant / travailleur autonome" },
  { value: "other", label: "Autre" },
];

// Tools (EN)
export const TOOLS_EN = [
  { id: "client-profile", name: "Client profile", description: "A structured way to describe the person behind your buying decision." },
  { id: "client-definition-framework", name: "Client definition framework", description: "A framework to move from a vague audience to a clear definition of your client." },
  { id: "level-of-client-definition", name: "Level of client definition", description: "A way to evaluate how clearly you have defined your client today." },
  { id: "buying-process-stages", name: "Buying process stages", description: "The steps your client moves through before choosing to work with you." },
  { id: "internal-factors", name: "Internal factors", description: "The personal, inner forces that shape how your client decides." },
  { id: "external-factors", name: "External factors", description: "The surrounding context that influences your client's buying decisions." },
  { id: "communication-worksheet", name: "Communication worksheet", description: "A worksheet to align how you speak with what your client needs to hear." },
  { id: "ideal-client-criteria", name: "Ideal client criteria", description: "A short checklist to identify the clients most aligned with your work." },
];
// Tools (FR)
export const TOOLS_FR = [
  { id: "client-profile", name: "Profil client", description: "Une façon structurée de décrire la personne derrière la décision d'achat." },
  { id: "client-definition-framework", name: "Cadre de définition du client", description: "Un cadre pour passer d'une audience floue à une définition claire du client." },
  { id: "level-of-client-definition", name: "Niveau de définition du client", description: "Une manière d'évaluer à quel point votre client est clairement défini aujourd'hui." },
  { id: "buying-process-stages", name: "Étapes du processus d'achat", description: "Les étapes que franchit votre client avant de choisir de travailler avec vous." },
  { id: "internal-factors", name: "Facteurs internes", description: "Les forces personnelles et intérieures qui influencent les décisions de votre client." },
  { id: "external-factors", name: "Facteurs externes", description: "Le contexte qui entoure et influence les décisions d'achat de votre client." },
  { id: "communication-worksheet", name: "Feuille de travail en communication", description: "Une feuille pour aligner votre discours sur ce que votre client a besoin d'entendre." },
  { id: "ideal-client-criteria", name: "Critères du client idéal", description: "Une courte liste pour identifier les clients les plus alignés avec votre travail." },
];

// Real testimonials from clients + Amazon reviews
export const TESTIMONIALS = [
  {
    author: "Greg Weatherdon",
    role: "Entrepreneur, Author, Coach",
    stars: 5,
    quote:
      "Successful entrepreneurs know that the best business ideas solve real problems. Unfortunately, in this overhyped world, far too many budding entrepreneurs create solutions for problems that don't exist. Who Are My Clients by Antoine Carriere is a must read for anyone thinking of starting a business or expanding their current offering. It'll make you think!",
  },
  {
    author: "George Borovec",
    role: "Entrepreneur, EIR",
    stars: 5,
    quote:
      "As a seasoned serial tech entrepreneur and advisor to over 300 founders & startups, I can emphatically say, Who Are My Clients is an insightful and revealing must read for every aspiring entrepreneur!",
  },
  {
    author: "Luisa Ji",
    role: "Entrepreneur, Design",
    stars: 4,
    title: "It is very digestible",
    quote:
      "As an entrepreneur in the design field, I find the angle on understanding the internal factors of decision-making refreshing. It is very digestible in how the question is broken down chapter by chapter.",
  },
  {
    author: "Jared Langdon",
    role: "Reader",
    stars: 5,
    title: "Thinking about all the right things",
    quote:
      "This book will get you thinking about all the right things. It will force you to ask the questions that you may have been avoiding.",
  },
  {
    author: "Emile Salem",
    role: "Business owner",
    stars: 5,
    title: "A must read for all business owners",
    quote:
      "Thoroughly enjoyed reading this book! It is a must read for all business owners, marketing and sales professional. Thank you Antoine for putting this all together.",
  },
  {
    author: "Terry Power",
    role: "Emerging entrepreneur",
    stars: 5,
    title: "The client is key",
    quote:
      "The client is key. This book explains why. A must read for any emerging entrepreneur!",
  },
];
