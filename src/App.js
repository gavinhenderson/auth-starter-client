import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, useOktaAuth, LoginCallback } from "@okta/okta-react";
import LockIcon from "@material-ui/icons/Lock";
import { Button, Paper, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { OktaAuth } from "@okta/okta-auth-js";

const CALLBACK_PATH = "/implicit/callback";

const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
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

function Home() {
  const { authService } = useOktaAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email, password }) => {
    const oktaAuth = new OktaAuth(oktaConfig);

    try {
      const { sessionToken } = await oktaAuth.signIn({
        username: email,
        password,
      });
      authService.redirect({ sessionToken });
    } catch (e) {
      console.error(e);
    }
  };
  // oktaAuth
  //   .signIn({ username, password })
  //   .then((res) => {
  //     const sessionToken = res.sessionToken;
  //     setSessionToken(sessionToken);
  //     // sessionToken is a one-use token, so make sure this is only called once
  //     authService.redirect({ sessionToken });
  //   })
  //   .catch((err) => console.log("Found an error", err));

  return (
    <Background>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CenteredPaper>
          <Stack>
            <HeaderSection>
              <Logo fontSize="large" />
              <Typography variant="h5">
                Super Awesome Application Inc.
              </Typography>
            </HeaderSection>
            <input
              ref={register}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
            />
            <input
              ref={register}
              id="password"
              name="password"
              label="Password"
              variant="outlined"
            />
            <Button type="submit">Login</Button>
          </Stack>
        </CenteredPaper>
      </form>
    </Background>
  );
}

// const TextInput = styled(TextField)`
//   && {
//     margin: 1rem 0;
//   }
// `;

const Logo = styled(LockIcon)`
  color: #3f51b5;
  font-size: 2rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  max-width: 200px;
  margin: 0 auto;
`;

const CenteredPaper = styled(Paper)`
  max-width: 400px;
  padding: 2rem;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
