import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
const port = process.env.SERVERPORT || 5000;
axios.defaults.baseURL = `http://localhost:${port}/api/`;
root.render(<App />);
