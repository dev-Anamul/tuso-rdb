import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/src/sweetalert2.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { getUserFromLocal } from "./pages/login/store";
import { getModuleFromLoacl } from "./pages/module/store";
import { getAllSyncData } from "./pages/syncronise/store";

store.dispatch(getUserFromLocal());
store.dispatch(getModuleFromLoacl());
store.dispatch(getAllSyncData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
