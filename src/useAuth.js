import React, { useContext } from "react";
import { OktaAuth } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { useEffect, useState, useCallback } from "react";
import { default as OktaSecurity } from "@okta/okta-react/dist/Security";

export const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

const AuthContext = React.createContext();

export const AuthJunk = ({ children }) => (
  <OktaSecurity {...oktaConfig}>
    <AuthState>{children}</AuthState>
  </OktaSecurity>
);

const AuthState = ({ children }) => {
  const oktaAuth = new OktaAuth(oktaConfig);
  const [authProvider, setAuthProvider] = useState("okta");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const {
    authService,
    authState: { isAuthenticated },
  } = useOktaAuth();

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

const useAuth0 = () => {
  return {
    registerUrl: "/",
    login: () => {},
    isAuthenticated: true,
    user: {},
    loadingUser: false,
    logout: () => {},
  };
};

export const useAuth = () => {
  const { authProvider, setAuthProvider } = useContext(AuthContext);

  const toggleProvider = () => {
    const newProvider = authProvider === "okta" ? "auth0" : "okta";
    setAuthProvider(newProvider);
  };

  const okta = useOkta();
  const auth0 = useAuth0();

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
