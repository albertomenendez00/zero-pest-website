const site = require("./site.js");

module.exports = {
  "@context": "https://schema.org",
  "@type": "PestControl",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  image: `${site.url}/assets/images/icon-512.png`,
  priceRange: "$$",
  // Placeholder values ("[ADD: ...]") and blanks are left out, so Google never
  // sees unfinished text. A service-area business can leave the street blank.
  address: Object.fromEntries(
    Object.entries({ "@type": "PostalAddress", ...site.address }).filter(
      ([, v]) => v && !String(v).startsWith("[ADD")
    )
  ),
  sameAs: Object.values(site.social || {}),
  areaServed: site.areas.map((a) => ({ "@type": "City", name: a.name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};
