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
