import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <div className="container" style={{ marginTop: "20px" }}>
      <App />
    </div>
  </StrictMode>,
  rootElement
);
