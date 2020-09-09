import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginCallback from "@okta/okta-react/dist/LoginCallback";

import { Home } from "./Home";
import { OktaWidget } from "./OktaWidget";
import { AuthToggle } from "./AuthToggle";
import { AuthJunk, history } from "./useAuth";

export const Router = () => {
  return (
    <AuthJunk>
      <BrowserRouter history={history}>
        <Route path="/">
          <AuthToggle />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin/register">
          <OktaWidget />
        </Route>
        <Route path="/implicit/callback">
          <LoginCallback />
        </Route>
      </BrowserRouter>
    </AuthJunk>
  );
};
