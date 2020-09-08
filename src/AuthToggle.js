import React from "react";
import { Switch, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useAuth } from "./useAuth";

export const AuthToggle = () => {
  const { authProvider, toggleProvider } = useAuth();

  const checked = authProvider !== "okta";

  return (
    <ToggleContainer>
      <Typography>Okta</Typography>
      <Switch checked={checked} onClick={toggleProvider} />
      <Typography>Auth0</Typography>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;
