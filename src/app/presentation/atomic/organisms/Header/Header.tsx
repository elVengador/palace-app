import React, { useEffect, useState } from 'react';

import './Header.scss';
import { Title } from '../../atoms/Title/Title';

interface HeaderProps {
    title: string;
}

export const Header = ({
    title = ''
}: HeaderProps): JSX.Element => {

    const [theme, setTheme] = useState("light-theme");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setThemeOnPage() }, [theme])

    const setThemeOnPage = () => {
        console.log('change theme');
        const rootElement = document.getElementById('root')
        if (!rootElement) { return }

        rootElement.classList.remove('light-theme')
        rootElement.classList.remove('dark-theme')
        rootElement.classList.add(theme)
    }

    const toogleTheme = () => {
        if (theme === 'light-theme') setTheme('dark-theme')
        if (theme === 'dark-theme') setTheme('light-theme')
    }

    return (
        <header className="header">
            <div className="header--items">
                <Title content={title} color="secondary"></Title>
                <button onClick={() => toogleTheme()}>{theme}</button>
            </div>
        </header>
    );
};
