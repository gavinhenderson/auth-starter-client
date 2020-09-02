import { OktaAuth } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { useEffect, useState, useCallback } from "react";

export const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export const useAuth = () => {
  const oktaAuth = new OktaAuth(oktaConfig);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const {
    authService,
    authState: { isAuthenticated },
  } = useOktaAuth();

  const loadUser = useCallback(async () => {
    setLoadingUser(true);
    const fetchedUser = await authService.getUser();
    setUser(fetchedUser);
    setLoadingUser(false);
  }, [authService]);

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
