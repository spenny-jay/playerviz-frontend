import { useState } from "react";
import { Form, Button } from "react-bootstrap";

type Props = {
  submitFn: (username: string, password: string) => void;
  formKey: string;
  isLoading: boolean;
};

/**
 * Generic form that prompts a user to enter a username and password
 * Used by both sign-up and log-in forms
 */
function AccessForm({ submitFn, formKey, isLoading }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // trigger the function passed in upon form submission
  const triggerFn = (e) => {
    e.preventDefault();
    submitFn(username, password);
  };

  return (
    <Form className="p-5" onSubmit={(e) => triggerFn(e)}>
      <Form.Group className="mb-3" controlId={`formUsername-${formKey}`}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="username"
          placeholder="Username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId={`formPassword-${formKey}`}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button disabled={isLoading || !username || !password} type="submit">
        Log In
      </Button>
    </Form>
  );
}

export default AccessForm;
