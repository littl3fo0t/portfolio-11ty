const i18n = require('eleventy-plugin-i18n');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(i18n, {
        defaultLanguage: "en"
    });

    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
        }
    }
};