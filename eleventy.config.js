export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy("_headers");

    const buildHash = Date.now().toString(36);

    eleventyConfig.addTransform("cacheBuster", function (content) {
        const outputPath = this.page.outputPath;

        if (outputPath && outputPath.endsWith(".html")) {
            return content
                .replace(/(href="\/css\/[^"|?]+)/g, `$1?v=${buildHash}`)
                .replace(/(src="\/js\/[^"|?]+)/g, `$1?v=${buildHash}`);
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

