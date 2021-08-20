import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logservice";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

/* I first tried to just call the init function by itself ( init() ) but that caused a bug to occur. The reason for this is because 
we're not exporting individual methods but an object that carries multiple methods. */
logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
