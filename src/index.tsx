import React from "react";
import { render } from "react-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./app/presentation/pages/home-page/HomePage";
// import '../tokens.scss'
import './index.scss'
import './app/presentation/utils/font-awesome.util';
import App from "./App";
// import SignUp from "./app/presentation/pages/Sign-Up/SignUp.page";
// import HomePage from "./app/presentation/pages/home-page/HomePage";

// function App() {
// const [theme, setTheme] = useState("light-theme");

// useEffect(() => { setThemeOnPage() }, [])

// const setThemeOnPage = () => {
//     const body = document.querySelector('body')
//     if (!body) { return }

//     body.classList.remove('light-theme')
//     body.classList.remove('dark-theme')
//     body.classList.add('light-theme')
// }

// const toogleTheme = () => {
//     if (theme === 'light-theme') setTheme('dark-theme')
//     if (theme === 'dark-theme') setTheme('light-theme')
// }

{/* <button onClick={() => toogleTheme()} > change {theme}</button> */ }
{/* <SignUp /> */ }

const rootElement = document.getElementById("root")

rootElement && rootElement.classList.add('light-theme')

render(<App />, rootElement);
