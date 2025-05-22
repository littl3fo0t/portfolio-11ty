//const i18nDataForPlugin = require("./src/_data/i18n.js");
const fs = require("fs");
const path = require("path");
//const util = require('util');

module.exports = async function (eleventyConfig) {
    const { I18nPlugin } = await import("@11ty/eleventy");
    const translations = {
        en: JSON.parse(fs.readFileSync(path.resolve(__dirname, "src", "en", "en.json"))),
        fr: JSON.parse(fs.readFileSync(path.resolve(__dirname, "src", "fr", "fr.json")))
    };
    //console.log("Translations object being passed to plugin:", JSON.stringify(translations, null, 2));
    eleventyConfig.addPlugin(I18nPlugin, {
        defaultLanguage: "en",
        translations: translations,
        defaultLocale: "en",
        locales: [
            { locale: 'en', urlPrefix: '/en/' },
            { locale: 'fr', urlPrefix: '/fr/' }
        ],
        fallbackLocales: { '*': 'en' }
    });

    //eleventyConfig.addFilter("dump", obj => util.inspect(obj, { depth: null }));

    eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
        }
    }
};