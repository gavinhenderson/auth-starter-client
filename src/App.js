import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, useOktaAuth, LoginCallback } from "@okta/okta-react";

import { Button } from "@material-ui/core";

const CALLBACK_PATH = "/implicit/callback";

const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

const Home = () => {
  console.log("react app loaded");

  const {
    authState: { loading, authenticated },
    authService,
  } = useOktaAuth();
  const login = () => authService.login("/");

  if (loading) return <p>Loading</p>;
  if (authenticated) return <p>Youre In</p>;

  return (
    <div>
      <Button onClick={login}>Login</Button>
      <Profile />
    </div>
  );
};

const Profile = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]);

  return (
    <div>
      {userInfo ? (
        <div>
          <p>Welcome back, {userInfo.name}!</p>
        </div>
      ) : (
        <p>Youre not logged in! Press login above</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Security {...oktaConfig}>
        <Route path="/">
          <Home />
        </Route>
        <Route path={CALLBACK_PATH}>
          <LoginCallback></LoginCallback>
        </Route>
      </Security>
    </Router>
  );
};

export default App;
