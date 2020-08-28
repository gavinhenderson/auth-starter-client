import React from "react";
import { useAuth } from "./useAuth";

import { LoggedInDash } from "./LoggedInDash";
import { SignInForm } from "./SignInForm";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <LoggedInDash /> : <SignInForm />}</>;
};
