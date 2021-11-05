import React, { useState } from "react";
import { render } from "react-dom";
import HomePage from "./app/presentation/pages/home-page/HomePage";

function App() {
    const [state, setState] = useState("CLICK ME");

    return <>
        <HomePage />
        <button onClick={() => setState("CLICKED")}>{state}</button>;
    </>
}

render(<App />, document.getElementById("root"));
