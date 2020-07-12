import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import pkg from "./package.json"

const config = {
    input: "tsc/index.js",
}

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]

const umd = Object.assign({}, config, {
    output: {
        file: `dist/${pkg.name}.dev.js`,
        format: "umd",
        name: "Starfield",
        exports: "named",
        globals: { react: "React" },
    },
    external: ["react", "react-dom"],
    plugins: [
        resolve(),
        commonjs(),
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ],
})

const umdProd = Object.assign({}, umd, {
    output: Object.assign({}, umd.output, {
        file: `dist/${pkg.name}.js`,
    }),
    plugins: [
        resolve(),
        commonjs(),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        terser({ output: { comments: false } }),
    ],
})

const cjs = Object.assign({}, config, {
    output: {
        file: `dist/${pkg.name}.cjs.js`,
        format: "cjs",
        exports: "named",
    },
    plugins: [resolve(), commonjs()],
    external,
})

const es = Object.assign({}, config, {
    output: {
        file: `dist/${pkg.name}.es.js`,
        format: "es",
        exports: "named",
    },
    plugins: [resolve(), commonjs(),],
    external,
})

export default [umd, umdProd, cjs, es]