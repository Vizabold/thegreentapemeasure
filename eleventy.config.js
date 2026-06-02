import fs from 'fs';
import path from 'path';

export default function (eleventyConfig) {
    const buildHash = Date.now().toString(36);

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy("_headers");

    eleventyConfig.on('eleventy.before', async () => {
        fs.mkdirSync('_site/js', { recursive: true });
        fs.mkdirSync('_site/css', { recursive: true });

        if (fs.existsSync('js/main.js')) {
            fs.copyFileSync('js/main.js', `_site/js/main-${buildHash}.js`);
        }
    });

    eleventyConfig.addTransform("cacheBuster", function (content) {
        const outputPath = this.page.outputPath;
        if (outputPath && outputPath.endsWith(".html")) {
            return content
                .replace(/\/js\/([a-zA-Z0-9_-]+)\.js/g, `/js/$1-${buildHash}.js`);
        }
        return content;
    });

    return {
        dir: {
            input: ".",
            output: "_site"
        }
    };
};
