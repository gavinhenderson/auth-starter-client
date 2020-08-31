import React, { useEffect } from "react";
import * as OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import lockLogo from "./lock.svg";
import { oktaConfig } from "./useAuth";

export const OktaWidget = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = oktaConfig;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split("/oauth2")[0],
      clientId,
      redirectUri,
      logo: lockLogo,
      registration: {
        parseSchema: function (schema, onSuccess, onFailure) {
          // handle parseSchema callback
          onSuccess(schema);
        },
        preSubmit: function (postData, onSuccess, onFailure) {
          // handle preSubmit callback
          onSuccess(postData);
        },
        postSubmit: function (response, onSuccess, onFailure) {
          // handle postsubmit callback
          onSuccess(response);
        },
      },
      features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
        registration: true, // REQUIRED
      },
      brandName: "Super Awesome Application Inc.",
      i18n: {
        en: {
          "primaryauth.title": "Sign in to Super Awesome Application Inc.",
        },
      },
      authParams: {
        pkce,
        issuer,
        display: "page",
        responseMode: pkce ? "query" : "fragment",
        scopes,
      },
    });

    widget.renderEl(
      { el: "#sign-in-widget" },
      () => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      }
    );

    return () => {
      widget.remove();
    };
  }, []);

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  );
};
