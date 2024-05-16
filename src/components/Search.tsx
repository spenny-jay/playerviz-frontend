import { Dispatch, SetStateAction } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import SearchDropdown from "./SearchDropdown";
import { PlayerModel } from "../models/PlayerModel";

type Props = {
  setPlayerList: Dispatch<SetStateAction<PlayerModel[]>>;
};

/**
 * Parent class storing the
 * @param setPlayerList: updates the playerList contents
 */
function Search({ setPlayerList }: Props) {
  return (
    <Form>
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm={6}>
            <SearchDropdown setPlayerList={setPlayerList} />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default Search;
