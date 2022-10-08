import { resolve } from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
    return packageJson.name;
};

const getPackageNameCamelCase = () => {
    try {
        const packageName = getPackageName();
        return (packageName.charAt(0).toLocaleUpperCase() + packageName.slice(1)).replace(/-./g, (char) =>
            char[1].toUpperCase()
        );
    } catch (err) {
        throw new Error("Name property in package.json is missing.");
    }
};

const fileName = {
    es: `${getPackageName()}.mjs`,
    cjs: `${getPackageName()}.cjs`,
    iife: `${getPackageName()}.iife.js`
};

module.exports = defineConfig({
    base: "./",
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: getPackageNameCamelCase(),
            formats: ["es", "cjs", "iife"],
            fileName: (format) => fileName[format]
        }
    }
});
