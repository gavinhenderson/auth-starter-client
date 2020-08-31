import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Button, Typography, TextField, Link } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useAuth } from "./useAuth";
import { Formik, Form } from "formik";
import { OktaWidget } from "./OktaWidget";

const ERROR_MESSAGE = "The username or password you entered is incorrect";

export const SignInForm = () => {
  const { login, registerUrl } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Background>
      <OktaWidget />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await login(values);
          } catch (e) {
            console.warn(e);
            setErrorMessage(ERROR_MESSAGE);
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <CenteredPaper>
              <Stack>
                <HeaderSection>
                  <Logo fontSize="large" />
                  <Typography variant="h5">
                    Super Awesome Application Inc.
                  </Typography>
                </HeaderSection>
                <TextInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                />
                <TextInput
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <NewAccountMessage>
                  Dont have an account yet?{" "}
                  <Link href={registerUrl}>Sign up here</Link>
                </NewAccountMessage>
                <Button
                  disabled={!isFormComplete(values)}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Stack>
            </CenteredPaper>
          </Form>
        )}
      </Formik>
    </Background>
  );
};

const NewAccountMessage = styled(Typography)`
  padding-bottom: 1rem;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const ErrorMessage = styled(Typography)`
  color: #f44336;
`;

const isFormComplete = ({ email, password }) => {
  if (!email) return false;
  if (!password) return false;
  return true;
};

const TextInput = styled(TextField)`
  && {
    margin: 1rem 0;
  }
`;

const Logo = styled(LockIcon)`
  color: #3f51b5;
  font-size: 2rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin: 0 auto;
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
