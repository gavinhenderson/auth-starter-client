import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function App() {
  return (
    <Background>
      <Paper>
        <Stack>
          <TextField id="name" label="Name" variant="outlined" />
          <TextField id="email" label="Email" variant="outlined" />
          <TextField id="password" label="Password" variant="outlined" />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            variant="outlined"
          />
        </Stack>
      </Paper>
    </Background>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
