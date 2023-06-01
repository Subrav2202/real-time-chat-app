import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/index";
import { Provider } from 'react-redux'
import App from "./App.jsx";
import "./index.css";
import '../src/styles/fonts.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
