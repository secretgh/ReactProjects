import React from "react";
import ReactDOM  from "react-dom/client";
import * as tree from "./tree.js";

tree.buildTree("A+(B*C+D)/E");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <h1>Calculator App</h1>
    </React.StrictMode>
);