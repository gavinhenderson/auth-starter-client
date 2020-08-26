import { OktaAuth } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";

export const oktaConfig = {
  clientId: "0oapy5xhfcUOfOi8G4x6",
  issuer: "https://dev-373874.okta.com/oauth2/default",
  redirectUri: window.location.href + "implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export const useAuth = () => {
  const oktaAuth = new OktaAuth(oktaConfig);
  const { authService } = useOktaAuth();

  const login = async ({ email, password }) => {
    const { sessionToken } = await oktaAuth.signIn({
      username: email,
      password,
    });
    authService.redirect({ sessionToken });
  };

  return { login };
};
