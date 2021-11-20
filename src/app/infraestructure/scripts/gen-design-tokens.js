/* eslint-disable @typescript-eslint/no-var-requires */
// import fs from 'fs';

// import { choices, desicions } from '../utils/design-tokens';

// import * as fs from 'fs';

const fs = require('fs')

const { choices, desicions } = require('../utils/design-tokens')

const generateDesignTokens = () => {

    const desicionColorKeys = Object.keys(desicions.colors)
    const colorProperties = desicionColorKeys.reduce((acu, cur, idx, src) => acu + `--${cur}: ${desicions.colors[cur]};${idx === src.length - 1 ? '' : '\n'}`, '')

    console.log('.> Generando');
    // const variablesCss = ''

    const data = `
/* file generate by Design Tokens, author: elVengador */

:root {
${colorProperties}
}
    `

    fs.writeFile("./tokens.css", data, 'utf-8', (err) => {
        if (err) { return console.error('.> Ups, no se pudo generar tokens', err) }
        console.log('.> Exito');
    })
}

generateDesignTokens()
console.log('>> scripts');
