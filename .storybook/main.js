module.exports = {
    "stories": [
        "../src/app/presentation/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-scss"
    ],
    "core": {
        "builder": "webpack5"
    }
}
