import React, { useContext } from "react";
import { OktaAuth } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { useEffect, useState, useCallback } from "react";
import { default as OktaSecurity } from "@okta/okta-react/dist/Security";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";
import { createBrowserHistory } from "history";

export const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.returnTo || window.location.pathname);
};

const auth0Config = {
  domain: "gavinhenderson.eu.auth0.com",
  clientId: "IqOTpP7JnPsKMruoHUPQMYcwP6iQBgI2",
  redirectUri: window.location.origin + "/auth0/implicit/callback",
  onRedirectCallback: onRedirectCallback,
};

const AuthContext = React.createContext();

export const AuthJunk = ({ children }) => (
  <OktaSecurity {...oktaConfig}>
    <Auth0Provider {...auth0Config}>
      <AuthState>{children}</AuthState>
    </Auth0Provider>
  </OktaSecurity>
);

const AuthState = ({ children }) => {
  const oktaAuth = new OktaAuth(oktaConfig);
  const [authProvider, setAuthProvider] = useState("auth0");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const {
    authService,
    authState: { isAuthenticated },
  } = useOktaAuth();

  const auth0Service = new auth0.WebAuth({
    domain: "gavinhenderson.eu.auth0.com",
    clientID: "IqOTpP7JnPsKMruoHUPQMYcwP6iQBgI2",
    redirectUri: window.location.origin + "/auth0/implicit/callback",
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          authProvider,
          setAuthProvider,
          okta: {
            oktaAuth,
            user,
            setUser,
            loadingUser,
            setLoadingUser,
            authService,
            isAuthenticated,
          },
          auth0: {
            authService: auth0Service,
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useOkta = () => {
  const {
    okta: {
      oktaAuth,
      user,
      setUser,
      loadingUser,
      setLoadingUser,
      authService,
      isAuthenticated,
    },
  } = useContext(AuthContext);

  const loadUser = useCallback(async () => {
    setLoadingUser(true);
    const fetchedUser = await authService.getUser();
    setUser(fetchedUser);
    setLoadingUser(false);
  }, [authService, setUser, setLoadingUser]);

  // Apparently use effects have to synchronus
  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, [loadUser, isAuthenticated]);

  const login = async ({ email, password }) => {
    const { sessionToken } = await oktaAuth.signIn({
      username: email,
      password,
    });
    authService.redirect({ sessionToken });
  };

  const registerUrl = "/signin/register";

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return { registerUrl, login, isAuthenticated, user, loadingUser, logout };
};

const useAuth0Wrapper = () => {
  const { logout, isAuthenticated, isLoading, user } = useAuth0();

  console.log({ user });

  const {
    auth0: { authService },
  } = useContext(AuthContext);

  const login = async ({ email, password }) => {
    authService.login(
      {
        responseType: "token",
        username: email,
        password,
        realm: "Username-Password-Authentication",
      },
      (...response) => {
        console.log("response", response);
      }
    );
  };

  return {
    registerUrl: "/",
    login,
    isAuthenticated,
    user: {},
    loadingUser: isLoading,
    logout,
  };
};

export const useAuth = () => {
  const { authProvider, setAuthProvider } = useContext(AuthContext);

  const toggleProvider = () => {
    const newProvider = authProvider === "okta" ? "auth0" : "okta";
    setAuthProvider(newProvider);
  };

  const okta = useOkta();
  const auth0 = useAuth0Wrapper();

  const both = {
    authProvider,
    toggleProvider,
  };

  if (authProvider === "okta") {
    return { ...okta, ...both };
  } else {
    return { ...auth0, ...both };
  }
};
