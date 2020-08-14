import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, useOktaAuth, LoginCallback } from "@okta/okta-react";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

const CALLBACK_PATH = "/implicit/callback";

const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

const Home = () => {
  const {
    authState: { loading, authenticated },
    authService,
  } = useOktaAuth();
  const login = () => authService.login("/profile");
  console.log({ authService });

  if (loading) return <p>Loading</p>;
  if (authenticated) return <p>Youre In</p>;

  return <Button onClick={login}>Login</Button>;
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
      {userInfo && (
        <div>
          <p>Welcome back, {userInfo.name}!</p>
        </div>
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
        <Route path="/profile">
          <Profile></Profile>
        </Route>
      </Security>
    </Router>
  );
};

export default App;

// function App() {
//   return (
//     <Background>
//       <CenteredPaper>
//         <Stack>
//           <HeaderSection>
//             <Logo fontSize="large" />
//             <Typography variant="h5">Super Awesome Application Inc.</Typography>
//           </HeaderSection>
//           <TextInput id="email" label="Email" variant="outlined" />
//           <TextInput id="password" label="Password" variant="outlined" />
//           <Button variant="primary">Login</Button>
//           <Button variant="text">Forgot password</Button>
//           <Button variant="text">
//             Are you new here? Register with with email here
//           </Button>
//         </Stack>
//       </CenteredPaper>
//     </Background>
//   );
// }

// const TextInput = styled(TextField)`
//   && {
//     margin: 1rem 0;
//   }
// `;

// const Logo = styled(LockIcon)`
//   color: #3f51b5;
//   font-size: 2rem;
// `;

// const HeaderSection = styled.div`
//   text-align: center;
//   max-width: 200px;
//   margin: 0 auto;
// `;

// const CenteredPaper = styled(Paper)`
//   max-width: 400px;
//   padding: 2rem;
// `;

// const Background = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: #f5f5f5;
//   align-items: center;
//   justify-content: center;
//   display: flex;
// `;

// const Stack = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export default App;
