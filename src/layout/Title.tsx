import { Col, Container, Row } from "react-bootstrap";

function Title() {
  return (
    <Container fluid>
      <Row className="justify-content-center p-4">
        <Col xs="auto">
          <h1>Welcome to PlayerViz.io</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Title;
