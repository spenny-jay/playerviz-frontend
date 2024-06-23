import { Button, Container, Navbar } from "react-bootstrap";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleUserLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">PlayerViz.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {isLoggedIn && (
              <Button onClick={() => handleUserLogout()}>Logout</Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
