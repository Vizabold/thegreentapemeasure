import fs from "fs";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy("_headers");

    const buildHash = Date.now().toString(36);

    eleventyConfig.addTransform("cacheBuster", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            let updatedContent = content
                .replace(/(href="\/css\/[^"|?]+)/g, `$1?v=${buildHash}`)
                .replace(/(src="\/js\/[^"|?]+)/g, `$1?v=${buildHash}`);

            return updatedContent;
        }
        return content;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};

