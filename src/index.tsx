import React from "react";
import { render } from "react-dom";

import './index.scss'
import './core/presentation/utils/font-awesome.util';
import App from "./App";

const rootElement = document.getElementById("root")

render(<App />, rootElement);
