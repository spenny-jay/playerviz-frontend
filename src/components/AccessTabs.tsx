import { Tabs, Tab, Col, Row } from "react-bootstrap";
import AccessForm from "./AccessForm";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

function AccessTabs() {
  const { setToken } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logIn = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/users/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      if (res.ok) {
        const token = await res.json();
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        console.log("Bad login attempt, try again.");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const signUp = async (username: string, password: string): Promise<void> => {
    setIsLoading(false);
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/users/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      if (res.ok) {
        const token = await res.json();
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        console.log(
          "Make sure your password is at least 8 characters long with 1 special character and/or your username is at least 8 characters and unique"
        );
      }
    } catch (e) {
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
