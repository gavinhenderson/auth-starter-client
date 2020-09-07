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

export const useAuth = () => {
  const result = useContext(AuthContext);

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
  } = result;

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
