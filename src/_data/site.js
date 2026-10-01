module.exports = {
  name: "Zero Pest Control",
  legalName: "Zero Pest Control Inc.",
  shortName: "Zero Pest Control",
  tagline: "Fast, Local Pest Control in Sudbury & Northern Ontario",
  description:
    "Licensed, insured pest control for homes and businesses across Sudbury, Espanola, Elliot Lake, Blind River, and Manitoulin.",
  url: "https://zeropestcontrol.ca",
  phone: "(705) 980-2006",
  phoneHref: "+17059802006",
  email: "service@zeropestcontrol.ca",
  // Shows the "[DRAFT – REVIEW]" notice on the Pest Library. Technician review
  // is done, so it's off; set to true to show it again.
  pestLibraryDraft: false,
  // Web3Forms access key for the quote form (sends to the inbox it was created with).
  web3formsKey: "c39e6e0a-6450-4caf-8e5f-a5dd7c43226e",
  hours: [
    { label: "Monday – Friday", value: "8:00 am – 5:00 pm" },
    { label: "Saturday – Sunday", value: "Closed" },
  ],
  hoursShort: "Mon–Fri, 8 am–5 pm",
  guarantee: "60–90 Day Service Guarantee",
  // Service-area business: no public street address is shown. Google gets the
  // city/province plus the list of service areas below.
  address: {
    addressLocality: "Sudbury",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areas: [
    { name: "Sudbury", slug: "sudbury" },
    { name: "Espanola", slug: "espanola" },
    { name: "Elliot Lake", slug: "elliot-lake" },
    { name: "Blind River", slug: "blind-river" },
    { name: "Manitoulin Island", slug: "manitoulin-island" },
  ],
  // Shown as icons in the footer and listed for Google (schema "sameAs").
  social: {
    instagram: "https://www.instagram.com/zeropestcontrol.ca/",
    facebook: "https://www.facebook.com/profile.php?id=61583884144410",
  },
  // Google Analytics 4 / Google tag ID (Google tag "zeropestcontrol.ca").
  // Leave empty ("") to turn tracking off.
  googleTagId: "G-1HJWP46Y4W",
  credentials: [
    "Licensed & Insured",
    "Family & Pet-Conscious Treatments",
    "60–90 Day Service Guarantee",
    "Local Northern Ontario Technicians",
  ],
};
