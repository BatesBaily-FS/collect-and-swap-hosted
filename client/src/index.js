import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
// import { APIProvider } from "@vis.gl/react-google-maps";

const root = ReactDOM.createRoot(document.getElementById("root"));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

root.render(
  <React.StrictMode>
    {/* <APIProvider apiKey={apiKey} libraries={["places"]}> */}
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: redirectUri }}
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
