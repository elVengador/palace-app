/* eslint-disable @typescript-eslint/no-var-requires */
// import fs from 'fs';

// import { choices, desicions } from '../utils/design-tokens';

// import * as fs from 'fs';

const fs = require('fs')

const { choices, desicions } = require('../utils/design-tokens')

const buildAProperty = (key, arrayProperties, prefix = '') => `--${prefix}${prefix ? '-' : ''}${key}: ${arrayProperties[key]};`

const generateDesignTokens = () => {

    const colorKeys = Object.keys(desicions.colors)
    const colorProperties = colorKeys
        .map((cur) => buildAProperty(cur, desicions.colors))
        .join('\n')

    const lightThemeKeys = Object.keys(desicions.light_theme)
    const lightThemeProperties = lightThemeKeys
        .map((cur) => buildAProperty(cur, desicions.light_theme))
        .join('\n')

    const darkThemeKeys = Object.keys(desicions.dark_theme)
    const darkThemeProperties = darkThemeKeys
        .map((cur) => buildAProperty(cur, desicions.dark_theme))
        .join('\n')

    const fontProperty = desicions.font

    const fontSizeKeys = Object.keys(desicions.fontsize)
    const fontSizeProperties = fontSizeKeys
        .map((cur) => buildAProperty(cur, desicions.fontsize, 'font-size'))
        .join('\n')


    console.log('.> Generando');
    console.log('.> Log:', darkThemeProperties);
    // const variablesCss = ''

    const data = `
/* file generate by Design Tokens, author: elVengador */

:root {
${colorProperties}
font-family: '${fontProperty}', cursive;
${fontSizeProperties}
}

.light-theme {
${lightThemeProperties}
}

.dark-theme {
${darkThemeProperties}
}
    `

    fs.writeFile("./tokens.scss", data, 'utf-8', (err) => {
        if (err) { return console.error('.> Ups, no se pudo generar tokens', err) }
        console.log('.> Exito');
    })
}

generateDesignTokens()
console.log('>> scripts');
