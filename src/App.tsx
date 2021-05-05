import React from "react";
import MailTo from "./MailTo";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <MailTo />
      </Container>
    </React.Fragment>
  );
}

export default App;
