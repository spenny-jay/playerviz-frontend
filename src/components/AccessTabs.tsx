import { Tabs, Tab, Col, Row } from "react-bootstrap";
import AccessForm from "./AccessForm";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { PostAsync } from "./Globals";
import { AuthRequest } from "../models/AuthRequest";
import { AuthResponse } from "../models/AuthResponse";

function AccessTabs() {
  const { setToken } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logIn = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const authRes = await PostAsync<AuthResponse, AuthRequest>(
        `api/users/login`,
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem("token", authRes.token);
      setToken(authRes.token);
    } catch (e) {
      console.log("Bad login attempt, try again.");
      console.log(e);
    }
    setIsLoading(false);
  };

  const signUp = async (username: string, password: string): Promise<void> => {
    setIsLoading(false);
    try {
      const authRes = await PostAsync<AuthResponse, AuthRequest>(
        `api/users/signup`,
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem("token", authRes.token);
      setToken(authRes.token);
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
