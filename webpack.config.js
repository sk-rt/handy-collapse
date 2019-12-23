const base = require("./webpack.config.base");
let devMode, publicPath;
if (process.env.NODE_ENV === "production") {
    publicPath = "";
    devMode = "production";
} else {
    publicPath = "js/";
    devMode = "development";
}
/**
 * For Es Module
 */
const esmOutputPath =
    process.env.NODE_ENV === "production" ? `${__dirname}/dist/${publicPath}` : `${__dirname}/dev/${publicPath}`;
const esm = {
    ...base,
    entry: {
        index: `${__dirname}/src/index.ts`
    },
    mode: devMode,
    output: {
        path: esmOutputPath,
        publicPath: publicPath,
        filename: "[name].js",
        library: "HandyCollapse",
        libraryTarget: "umd"
    }
};
/**
 * For stand-alone
 */
const standAloneOutputPath =
    process.env.NODE_ENV === "production"
        ? `${__dirname}/dist/standalone/${publicPath}`
        : `${__dirname}/dev/${publicPath}`;
const standAlone = {
    ...base,
    entry: {
        "handy-collapse": `${__dirname}/src/index-standalone.ts`
    },
    mode: devMode,
    output: {
        path: standAloneOutputPath,
        publicPath: publicPath,
        filename: "[name].js"
    }
};
module.exports = [esm, standAlone];
