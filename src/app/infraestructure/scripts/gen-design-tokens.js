/* eslint-disable @typescript-eslint/no-var-requires */
// import fs from 'fs';

// import { choices, desicions } from '../utils/design-tokens';

// import * as fs from 'fs';

const fs = require('fs')

const { choices, desicions } = require('../utils/design-tokens')

const generateDesignTokens = () => {

    const colorKeys = Object.keys(desicions.colors)
    const colorProperties = colorKeys.reduce((acu, cur, idx, src) => acu + `--${cur}: ${desicions.colors[cur]};${idx === src.length - 1 ? '' : '\n'}`, '')

    const lightThemeKeys = Object.keys(desicions.light_theme)
    const lightThemeProperties = lightThemeKeys.reduce((acu, cur, idx, src) => acu + `--${cur}:${desicions.light_theme[cur]};${idx === src.length - 1 ? '' : '\n'}`, '')

    const darkThemeKeys = Object.keys(desicions.dark_theme)
    const darkThemeProperties = darkThemeKeys.reduce((acu, cur, idx, src) => acu + `--${cur}:${desicions.dark_theme[cur]};${idx === src.length - 1 ? '' : '\n'}`, '')

    console.log('.> Generando');
    console.log('.> Log:', darkThemeProperties);
    // const variablesCss = ''

    const data = `
/* file generate by Design Tokens, author: elVengador */

:root {
${colorProperties}
}

.light-theme {
${lightThemeProperties}
}

.dark-theme {
${darkThemeProperties}
}
    `

    fs.writeFile("./tokens.css", data, 'utf-8', (err) => {
        if (err) { return console.error('.> Ups, no se pudo generar tokens', err) }
        console.log('.> Exito');
    })
}

generateDesignTokens()
console.log('>> scripts');
