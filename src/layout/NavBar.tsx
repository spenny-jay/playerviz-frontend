import { Button, Container, Navbar } from "react-bootstrap";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

function NavBar() {
  const { token, setToken } = useContext(UserContext);

  const handleUserLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">PlayerViz.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {token && (
              <Button onClick={() => handleUserLogout()}>Logout</Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
