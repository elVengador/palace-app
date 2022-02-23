module.exports = {
    "stories": [
        "../src/app/presentation/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/core/presentation/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-scss",
        '@storybook/addon-a11y', //👈 The a11y addon goes here
        '@storybook/addon-interactions', //👈 The interactions addon goes here
    ],
    "core": {
        "builder": "webpack5"
    }
}
