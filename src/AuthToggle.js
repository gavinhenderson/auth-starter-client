import React from "react";
import { Switch, Typography } from "@material-ui/core";
import styled from "styled-components";

export const AuthToggle = () => {
  return (
    <ToggleContainer>
      <Typography>Okta</Typography>
      <Switch />
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
