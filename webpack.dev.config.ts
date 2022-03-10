import path from "path";
import fs from 'fs'
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
// import { Configuration, HotModuleReplacementPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin'
// import { postcss } from "postcss-flexbugs-fixes";
import dotenv from 'dotenv';
import webpack from "webpack";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}


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
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, "src", "index.tsx"),
    },
    output: { publicPath: '/' },
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
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            favicon: path.resolve(__dirname, "src", "assets", "favicon.ico"),
            pwa: path.resolve(__dirname, "src", "assets", "pwa.json")
        }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({ extensions: ["js", "jsx", "ts", "tsx"] }),
        new webpack.DefinePlugin(getEnvKeys()),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'sw.js', to: 'sw.js' }
            ]
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true,
        https: {
            key: "./certs/localhost-key.pem",
            cert: "./certs/localhost.pem"
        }
    },
};

export default config;
