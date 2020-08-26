import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { oktaConfig } from "./useAuth";
import LoginCallback from "@okta/okta-react/dist/LoginCallback";
import Security from "@okta/okta-react/dist/Security";
import { Home } from "./Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Security {...oktaConfig}>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/implicit/callback">
          <LoginCallback />
        </Route>
      </Security>
    </BrowserRouter>
  );
};
