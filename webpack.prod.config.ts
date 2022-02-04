import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import dotenv from 'dotenv';
import webpack from "webpack";

const getEnvKeys = () => {
    const env = dotenv.config().parsed;
    let envKeys = {}
    if (env) {
        envKeys = Object.keys(env).reduce((acu, cur) => {
            const value = JSON.stringify(env[cur]);
            // acu[`process.env.${cur}`]
            const tt = `process.env.${cur}`
            return { ...acu, [tt]: value };
        }, {});
    }

    return envKeys
}

const config: Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "src/index.html" }),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({ extensions: ["js", "jsx", "ts", "tsx"] }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin(getEnvKeys())
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};

export default config;
