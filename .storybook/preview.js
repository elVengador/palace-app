import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import '../src/core/presentation/utils/font-awesome.util'
import { client } from '../src/core/infraestructure/apollo';
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
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div className={'preview--container'}>
                    <div className={'preview--container-light light-theme'}>
                        <Story />
                    </div>
                    <div className={'preview--container-dark dark-theme'}>
                        <Story />
                    </div>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    ),
];
