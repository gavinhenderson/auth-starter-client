import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { oktaConfig } from "./useAuth";
import LoginCallback from "@okta/okta-react/dist/LoginCallback";
import Security from "@okta/okta-react/dist/Security";
import { Home } from "./Home";
import { OktaWidget } from "./OktaWidget";

export const Router = () => {
  return (
    <BrowserRouter>
      <Security {...oktaConfig}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin/register">
          <OktaWidget />
        </Route>
        <Route path="/implicit/callback">
          <LoginCallback />
        </Route>
      </Security>
    </BrowserRouter>
  );
};
