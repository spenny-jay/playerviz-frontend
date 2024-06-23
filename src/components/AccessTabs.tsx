import { Tabs, Tab, Col, Row } from "react-bootstrap";
import AccessForm from "./AccessForm";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { loginApi, signUpApi } from "../Api";
import { AuthResponse } from "../models/AuthResponse";

/**
 * Contains tabs for the user to either log-in or sign-up. Upon
 * either form submission, the user will be assigned a token
 * and refresh token
 */
function AccessTabs() {
  const { setIsLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logIn = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const authRes: AuthResponse = await loginApi({
        username: username,
        password: password,
      });

      localStorage.setItem("token", authRes.token);
      localStorage.setItem("refreshToken", authRes.refreshToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.log("Bad login attempt, try again.");
      console.log(e);
    }
    setIsLoading(false);
  };

  const signUp = async (username: string, password: string): Promise<void> => {
    setIsLoading(false);
    try {
      const authRes: AuthResponse = await signUpApi({
        username: username,
        password: password,
      });

      localStorage.setItem("token", authRes.token);
      localStorage.setItem("refreshToken", authRes.refreshToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(
        "Make sure your password is at least 8 characters long with 1 special character and/or your username is at least 8 characters and unique"
      );
      console.log(e);
    }
    setIsLoading(true);
  };

  return (
    <Row className="justify-content-center">
      <Col sm={4}>
        <Tabs variant="pills" defaultActiveKey="login" fill>
          <Tab eventKey="login" title="Log In">
            <AccessForm
              submitFn={logIn}
              isLoading={isLoading}
              formKey="login"
            />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <AccessForm
              submitFn={signUp}
              isLoading={isLoading}
              formKey="signup"
            />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}

export default AccessTabs;
