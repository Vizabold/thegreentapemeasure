import EleventyAssetHash from "@vrugtehagel/eleventy-asset-hash";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy("_headers");

    eleventyConfig.addPlugin(EleventyAssetHash, {
        algorithm: "SHA-256",
        include: ["**/*.html"],
        includeAssets: ["**/*.{css,js}"]
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};

