import React from "react";
import { useAuth } from "./useAuth";

import { LoggedInDash } from "./LoggedInDash";
import { SignInForm } from "./SignInForm";
import styled from "styled-components";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Background>
      {isAuthenticated ? <LoggedInDash /> : <SignInForm />}
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  display: flex;
`;
