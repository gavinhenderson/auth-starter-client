import React from "react";
import { useAuth } from "./useAuth";
import { Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";

export const LoggedInDash = () => {
  const { logout, user, loadingUser } = useAuth();
  const emailVerified = user && user.email_verified;

  const showEmailVerifyBanner = !loadingUser && !emailVerified;

  console.log(showEmailVerifyBanner);

  return (
    <>
      {showEmailVerifyBanner && (
        <Banner>
          <BannerContainer>
            <Typography variant="h5">Verify your Email Address</Typography>
            <Typography>
              We need to verify your email address. We have sent an email to{" "}
              {user.email}, please click the link in that email to verify your
              email address
            </Typography>
          </BannerContainer>
        </Banner>
      )}
      <Background>
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
                <MiddleText>
                  Welcome to Super Awesome Application Inc.
                </MiddleText>
                <Button variant="contained" color="primary" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </CenteredPaper>
      </Background>
    </>
  );
};

const Banner = styled.div`
  width: 100vw;
  position: absolute;
  background-color: rgba(255, 229, 100, 0.4);
`;

const BannerContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  width: 90%;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

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
