// SEO Configuration and Utilities for GoalOracle AI

export const siteConfig = {
  name: "GoalOracle AI",
  description: "AI-Powered FIFA World Cup 2026 Predictions. Get expert match analysis, team statistics, betting tips, and live streaming guides for the biggest football tournament.",
  url: "https://goaloracleai.com",
  ogImage: "https://goaloracleai.com/og-image.jpg",
  links: {
    telegram: "https://t.me/goaloracleai",
    twitter: "https://twitter.com/goaloracleai",
  },
  keywords: [
    "FIFA World Cup 2026 predictions",
    "World Cup betting tips",
    "AI football predictions",
    "soccer predictions",
    "match analysis",
    "World Cup odds",
    "football betting",
    "World Cup streaming",
    "team statistics",
    "World Cup 2026",
  ],
}

export function generateMatchSchema(match: {
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
  competition: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    startDate: match.date,
    location: {
      "@type": "Place",
      name: match.venue,
    },
    competitor: [
      {
        "@type": "SportsTeam",
        name: match.homeTeam,
      },
      {
        "@type": "SportsTeam",
        name: match.awayTeam,
      },
    ],
    superEvent: {
      "@type": "SportsEvent",
      name: match.competition,
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  datePublished: string
  dateModified: string
  author: string
  image?: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    image: article.image || siteConfig.ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [siteConfig.links.telegram, siteConfig.links.twitter],
    description: siteConfig.description,
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/predictions?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
