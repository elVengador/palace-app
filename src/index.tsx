import React, { useState } from "react";
import { render } from "react-dom";
import HomePage from "./app/presentation/pages/home-page/HomePage";
import '../tokens.scss'

function App() {
    const [state, setState] = useState("CLICK ME");
    const [theme, setTheme] = useState("light-theme");

    const toogleTheme = () => {
        if (theme === 'light-theme') setTheme('dark-theme')
        if (theme === 'dark-theme') setTheme('light-theme')
    }

    return <div className={theme}>
        <HomePage />
        <button onClick={() => setState("CLICKED")}>{state}</button>;
        <button onClick={() => toogleTheme()} > change {theme}</button>;
    </div >
}

render(<App />, document.getElementById("root"));
