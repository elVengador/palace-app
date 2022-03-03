import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { client } from '../src/core/infraestructure/apollo';
import '../src/core/presentation/utils/font-awesome.util'
import './preview.scss'
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
    (Story) => {
        const [theme, setTheme] = useState("light-theme");

        useEffect(() => {
            const setThemeOnPage = () => {
                const body = document.querySelector('body')
                if (!body) { return }

                body.classList.remove('light-theme')
                body.classList.remove('dark-theme')
                body.classList.add(theme)
            }
            setThemeOnPage()
        }, [theme])



        const toogleTheme = () => {
            if (theme === 'light-theme') setTheme('dark-theme')
            if (theme === 'dark-theme') setTheme('light-theme')
        }

        return < ApolloProvider client={client} >
            <BrowserRouter>
                <div className={'preview--container'}>
                    <div className="options">
                        <button className='theme-option' onClick={() => { toogleTheme() }} aria-label="toogle theme"><FontAwesomeIcon icon="adjust" /></button>
                    </div>
                    <Story />
                </div>
            </BrowserRouter>
        </ApolloProvider >
    },
];
