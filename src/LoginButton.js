// Code below copied and pasted from Auth0 docs 
// https://auth0.com/docs/quickstart/spa/react#add-login-to-your-application

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="info" onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;