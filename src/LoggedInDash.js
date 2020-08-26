import React from "react";
import { useAuth } from "./useAuth";
import { Button } from "@material-ui/core";

export const LoggedInDash = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Youre logged in</h1>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
