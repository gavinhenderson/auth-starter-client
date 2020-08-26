import React from "react";
import styled from "styled-components";
import { Paper, Button, Typography, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { useAuth } from "./useAuth";
import { Formik, Form } from "formik";

export const SignInForm = () => {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        await login(values);
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
  );
};

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
  max-width: 400px;
  margin: 0 auto;
`;

const CenteredPaper = styled(Paper)`
  max-width: 400px;
  padding: 2rem;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
`;
