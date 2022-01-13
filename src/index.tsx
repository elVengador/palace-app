import React, { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./app/presentation/pages/home-page/HomePage";
// import '../tokens.scss'
import './index.scss'
import './app/presentation/utils/font-awesome.util';
import SignUp from "./app/presentation/pages/Sign-Up/SignUp.page";
import HomePage from "./app/presentation/pages/home-page/HomePage";

function App() {
    // const [theme, setTheme] = useState("light-theme");

    useEffect(() => { setThemeOnPage() }, [])

    const setThemeOnPage = () => {
        const body = document.querySelector('body')
        if (!body) { return }

        body.classList.remove('light-theme')
        body.classList.remove('dark-theme')
        body.classList.add('light-theme')
    }

    // const toogleTheme = () => {
    //     if (theme === 'light-theme') setTheme('dark-theme')
    //     if (theme === 'dark-theme') setTheme('light-theme')
    // }



    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    {/* <Route element={<HomePage />} /> */}
                </Route>
                <Route path="auth" element={<SignUp />}>
                    {/* <Route path="sign-up" element={<SignUp />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
        {/* <button onClick={() => toogleTheme()} > change {theme}</button> */}
        {/* <SignUp /> */}
    </div >
}

render(<App />, document.getElementById("root"));
