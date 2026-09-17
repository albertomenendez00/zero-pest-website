const site = require("./site.js");

module.exports = {
  "@context": "https://schema.org",
  "@type": "PestControl",
  name: site.name,
  url: site.url,
  telephone: site.phoneHref,
  email: site.email,
  image: `${site.url}/assets/images/icon-512.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.streetAddress,
    addressLocality: site.address.addressLocality,
    addressRegion: site.address.addressRegion,
    postalCode: site.address.postalCode,
    addressCountry: site.address.addressCountry,
  },
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
