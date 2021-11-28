import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import HomePage from "./app/presentation/pages/home-page/HomePage";
import '../tokens.scss'
import './index.scss'

function App() {
    const [state, setState] = useState("CLICK ME");
    const [theme, setTheme] = useState("light-theme");

    useEffect(() => {
        const setThemeOnPage = () => {
            const body = document.querySelector('body')
            if (!body) { return }

            body.classList.remove('light-theme')
            body.classList.remove('dark-theme')
            // body.classList.remove('bg')
            body.classList.add(theme)
            // body.classList.add('bg')
        }
        setThemeOnPage()
    }, [theme])

    const toogleTheme = () => {
        if (theme === 'light-theme') setTheme('dark-theme')
        if (theme === 'dark-theme') setTheme('light-theme')
    }



    return <div>
        <HomePage />
        <button onClick={() => setState("CLICKED")}>{state}</button>;
        <button onClick={() => toogleTheme()} > change {theme}</button>;
    </div >
}

render(<App />, document.getElementById("root"));
