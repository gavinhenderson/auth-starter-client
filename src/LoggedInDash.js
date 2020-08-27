import React from "react";
import { useAuth } from "./useAuth";
import { Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";

export const LoggedInDash = () => {
  const { logout, user, loadingUser } = useAuth();

  return (
    <CenteredPaper>
      <Stack>
        {loadingUser ? (
          <Spinner />
        ) : (
          <>
            <Typography variant="h5">
              Hey, {user.given_name}{" "}
              <span role="img" aria-label="wave emoji">
                👋
              </span>
            </Typography>
            <MiddleText>Welcome to Super Awesome Application Inc.</MiddleText>
            <Button variant="contained" color="primary" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Stack>
    </CenteredPaper>
  );
};

const MiddleText = styled(Typography)`
  padding: 1rem 0;
`;

const Spinner = styled(CircularProgress)`
  margin: 2.625rem auto;
  height: 124px;
`;

const CenteredPaper = styled(Paper)`
  max-width: 400px;
  width: 90vw;
  margin: 2rem;
  padding: 2rem;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
`;
