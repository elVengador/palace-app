const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// import path from "path";

module.exports = async ({ config }) => {
    // fonts
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'Merienda-Regular.ttf'),
                    to: 'Merienda'
                },
            ]
        }),
    );

    return config;
};
