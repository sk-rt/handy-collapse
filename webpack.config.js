const base = require("./webpack.config.base");
const environment = process.env.NODE_ENV || "development";
const isDevelopment = environment === "development";
const publicPath = isDevelopment ? "js/" : "";

/**
 * For Es Module
 */
const esmOutputPath =
    process.env.NODE_ENV === "production" ? `${__dirname}/dist/${publicPath}` : `${__dirname}/sample/${publicPath}`;
const esm = {
    ...base,
    entry: {
        index: `${__dirname}/src/index.ts`
    },
    mode: isDevelopment ? environment : "production",
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
        : `${__dirname}/sample/${publicPath}`;
const standAlone = {
    ...base,
    entry: {
        "handy-collapse": `${__dirname}/src/index-standalone.ts`
    },
    mode: isDevelopment ? environment : "production",

    output: {
        path: standAloneOutputPath,
        publicPath: publicPath,
        filename: "[name].js"
    },
    devServer: {
        contentBase: `${__dirname}/sample/`,
        watchContentBase: true,
        open: true,
        host: "0.0.0.0",
        useLocalIp: true,
        port: 8888
    }
};

module.exports = [esm, standAlone];
