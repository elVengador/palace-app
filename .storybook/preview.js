import React from 'react';

import '../src/app/presentation/utils/font-awesome.util'
import './preview.scss'
import '../tokens.scss'
import '../src/index.scss'

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    (Story) => (
        <div className={'container'}>
            <div className={'container-light light-theme'}>
                <Story />
            </div>
            <div className={'container-dark dark-theme'}>
                <Story />
            </div>
        </div>
    ),
];
