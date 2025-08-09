import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
// import { APIProvider } from "@vis.gl/react-google-maps";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

root.render(
  <React.StrictMode>
    {/* <APIProvider apiKey={apiKey} libraries={["places"]}> */}
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ck4nx3l57ptykeyg.us.auth0.com"
        clientId="QmcMOXJAWYlYMHjfhn7JhoithN23Q0MX"
        authorizationParams={{
          redirect_uri: window.location.origin + "/callback",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
    {/* </APIProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
