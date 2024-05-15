import { Dispatch, SetStateAction } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import SearchDropdown from "./SearchDropdown";
import { PlayerModel } from "../models/PlayerModel";

type Props = {
  setPlayerList: Dispatch<SetStateAction<PlayerModel[]>>;
};

function Search({ setPlayerList }: Props) {
  return (
    <Form>
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm={6}>
            <Form.Group className="mx-1" controlId="playerInput">
              <SearchDropdown setPlayerList={setPlayerList} />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default Search;
