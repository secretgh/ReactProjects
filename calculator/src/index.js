import React from "react";
import ReactDOM  from "react-dom/client";
import * as tree from "./tree.js";

class calculator extends React.Component{
    constructor(props){

    }

    render(){
        
        return (
            <></>
        );
    };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <h1>Calculator App</h1>
    </React.StrictMode>
);