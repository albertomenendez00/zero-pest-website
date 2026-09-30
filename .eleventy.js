module.exports = function (eleventyConfig) {
  // Static passthrough copy
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/site.webmanifest": "site.webmanifest" });

  eleventyConfig.addWatchTarget("src/assets/css/");

  // Collections
  eleventyConfig.addCollection("services", (api) =>
    api.getFilteredByGlob("src/services/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("industries", (api) =>
    api.getFilteredByGlob("src/industries/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  eleventyConfig.addCollection("pestLibrary", (api) =>
    api
      .getFilteredByGlob("src/pest-library/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  // Filters
  eleventyConfig.addFilter("slugifyPhone", (phone) => String(phone).replace(/[^\d+]/g, ""));

  eleventyConfig.addFilter("findBy", (arr, key, value) =>
    (arr || []).find((item) => item[key] === value)
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Cache-busting: append a short hash of the file's contents, e.g.
  // /assets/css/style.css?v=3f9a1c2b. Assets are cached for a year (see
  // netlify.toml), so the URL must change whenever the file changes or
  // returning visitors keep seeing the old styles.
  const fs = require("fs");
  const crypto = require("crypto");
  eleventyConfig.addFilter("bust", (url) => {
    const file = "src" + url;
    const hash = crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
    return `${url}?v=${hash}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
