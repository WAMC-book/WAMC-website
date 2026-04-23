// Minimal, centralized translations. Pages that remain partially English
// today will fall back gracefully; new FR copy is expanded progressively.

export const translations = {
  en: {
    nav: {
      home: "Home",
      book: "Book",
      resources: "Resources",
      tools: "Tools",
      about: "About",
      contact: "Contact",
    },
    cta: {
      buy: "Buy the book",
      buyNow: "Buy now",
      getChapters: "Get the first 3 chapters",
      downloadChapters: "Download the first 3 chapters",
      alsoOn: "Also on",
      readMoreAmazon: "Read more reviews on Amazon",
    },
    hero: {
      eyebrow: "By Antoine B. Carrière",
      title1: "Most entrepreneurs know their",
      title_offer: "offer",
      title2: "better than they know their",
      title_clients: "clients",
      subtitle:
        "Understand the people behind the buying decision — so you can build, communicate, and grow with greater clarity.",
    },
    footer: {
      explore: "Explore",
      startHere: "Start here",
      startHereBody:
        "The fastest way to find out if this book is for you is to read the first three chapters.",
      copyright: "All rights reserved.",
    },
    testimonials: {
      title: "What readers are saying",
      titleBlue: "saying",
      readMore: "Read more reviews on Amazon →",
    },
    login: {
      title: "Admin login",
      subtitle: "Restricted area. Sign in to manage the site.",
      passwordLabel: "Password",
      submit: "Sign in",
      error: "Incorrect password.",
      success: "Welcome back.",
    },
    admin: {
      title: "Admin dashboard",
      welcome: "Manage your leads, messages, and content.",
      stats: {
        leads: "Chapter downloads",
        contacts: "Contact messages",
      },
      tabs: {
        leads: "Downloads",
        contacts: "Messages",
        content: "Content",
      },
      exportCsv: "Export as CSV",
      noLeads: "No downloads yet.",
      noContacts: "No messages yet.",
      logout: "Sign out",
      comingSoon: "Coming soon",
      contentCards: {
        posts: {
          title: "Posts & articles",
          body: "Write, publish, and manage blog posts that support the book.",
        },
        podcasts: {
          title: "Podcasts",
          body: "Upload episodes, add show notes, and connect your feed.",
        },
        services: {
          title: "Services",
          body: "Publish workshops, client development programs, and coaching offers.",
        },
      },
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      book: "Le livre",
      resources: "Ressources",
      tools: "Outils",
      about: "À propos",
      contact: "Contact",
    },
    cta: {
      buy: "Acheter le livre",
      buyNow: "Acheter maintenant",
      getChapters: "Obtenir les 3 premiers chapitres",
      downloadChapters: "Télécharger les 3 premiers chapitres",
      alsoOn: "Aussi sur",
      readMoreAmazon: "Voir plus d'avis sur Amazon",
    },
    hero: {
      eyebrow: "Par Antoine B. Carrière",
      title1: "La plupart des entrepreneurs connaissent mieux leur",
      title_offer: "offre",
      title2: "que leurs",
      title_clients: "clients",
      subtitle:
        "Comprenez les personnes derrière la décision d'achat — afin de bâtir, communiquer et croître avec plus de clarté.",
    },
    footer: {
      explore: "Explorer",
      startHere: "Commencez ici",
      startHereBody:
        "La façon la plus simple de savoir si ce livre est pour vous : lire les trois premiers chapitres.",
      copyright: "Tous droits réservés.",
    },
    testimonials: {
      title: "Ce que les lecteurs en",
      titleBlue: "disent",
      readMore: "Voir plus d'avis sur Amazon →",
    },
    login: {
      title: "Connexion administrateur",
      subtitle: "Zone restreinte. Connectez-vous pour gérer le site.",
      passwordLabel: "Mot de passe",
      submit: "Se connecter",
      error: "Mot de passe incorrect.",
      success: "Bienvenue.",
    },
    admin: {
      title: "Tableau de bord",
      welcome: "Gérez vos contacts, messages et contenu.",
      stats: {
        leads: "Téléchargements",
        contacts: "Messages",
      },
      tabs: {
        leads: "Téléchargements",
        contacts: "Messages",
        content: "Contenu",
      },
      exportCsv: "Exporter en CSV",
      noLeads: "Aucun téléchargement pour le moment.",
      noContacts: "Aucun message pour le moment.",
      logout: "Se déconnecter",
      comingSoon: "À venir",
      contentCards: {
        posts: {
          title: "Articles",
          body: "Rédigez et publiez des articles pour soutenir le livre.",
        },
        podcasts: {
          title: "Balados",
          body: "Téléversez des épisodes, ajoutez des notes et branchez votre fil.",
        },
        services: {
          title: "Services",
          body: "Publiez vos ateliers, programmes de développement client et offres de coaching.",
        },
      },
    },
  },
};

export const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];
