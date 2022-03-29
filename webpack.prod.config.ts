import path from "path";
import { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const getEnvKeys = () => {

    const envKeys = {
        'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
        'process.env.API_PORT': JSON.stringify(process.env.API_PORT)
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
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: path.resolve(__dirname, "src", "assets", "favicon.ico")
        }),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({ extensions: ["js", "jsx", "ts", "tsx"] }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin(getEnvKeys()),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'pwa.json', to: 'pwa.json' },
                { from: 'sw.js', to: 'sw.js' }
            ]
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};

export default config;
