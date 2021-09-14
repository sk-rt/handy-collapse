const base = require("./webpack.config.base");
const environment = 'production' || "development";
const isDevelopment = environment === "production";
const publicPath = isDevelopment ? "/js/" : "/";

/**
 * For Es Module
 */
const esmOutputPath = process.env.NODE_ENV === "production" ? `${__dirname}/dist` : `${__dirname}/sample`;
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
    process.env.NODE_ENV === "production" ? `${__dirname}/dist/standalone` : `${__dirname}/sample`;
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
        quiet: false,
        contentBase: `${__dirname}/sample/`,
        watchContentBase: true,
        open: true,
        host: "0.0.0.0",
        useLocalIp: true,
        port: 8888
    }
};
if (isDevelopment) {
    module.exports = standAlone;
} else {
    module.exports = [esm, standAlone];
}
