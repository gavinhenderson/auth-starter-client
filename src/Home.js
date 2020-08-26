import React from "react";
import { useAuth } from "./useAuth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Paper, Button, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

export const Home = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  return (
    <Background>
      <form onSubmit={handleSubmit(login)}>
        <CenteredPaper>
          <Stack>
            <HeaderSection>
              <Logo fontSize="large" />
              <Typography variant="h5">
                Super Awesome Application Inc.
              </Typography>
            </HeaderSection>
            <input
              ref={register}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
            />
            <input
              ref={register}
              id="password"
              name="password"
              label="Password"
              variant="outlined"
            />
            <Button type="submit">Login</Button>
          </Stack>
        </CenteredPaper>
      </form>
    </Background>
  );
};

// const TextInput = styled(TextField)`
//   && {
//     margin: 1rem 0;
//   }
// `;

const Logo = styled(LockIcon)`
  color: #3f51b5;
  font-size: 2rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  max-width: 200px;
  margin: 0 auto;
`;

const CenteredPaper = styled(Paper)`
  max-width: 400px;
  padding: 2rem;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
`;
