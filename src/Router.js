import React from "react";
import { BrowserRouter as ReactRouter, Route } from "react-router-dom";
import LoginCallback from "@okta/okta-react/dist/LoginCallback";

import { Home } from "./Home";
import { OktaWidget } from "./OktaWidget";
import { AuthToggle } from "./AuthToggle";
import { AuthJunk, Auth0Callback } from "./useAuth";

export const Router = () => {
  return (
    <ReactRouter>
      <AuthJunk>
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
        <Route path="/auth0/implicit/callback">
          <Auth0Callback />
        </Route>
      </AuthJunk>
    </ReactRouter>
  );
};
