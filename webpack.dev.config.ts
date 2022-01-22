import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
// import { Configuration, HotModuleReplacementPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
// import { postcss } from "postcss-flexbugs-fixes";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
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
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src", "index.html") }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({ extensions: ["js", "jsx", "ts", "tsx"] }),
    ],
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true
    },
};

export default config;
