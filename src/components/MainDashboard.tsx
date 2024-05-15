import { Container, Row, Col } from "react-bootstrap";
import Search from "./Search";
import PlayerChart from "./PlayerChart";
import { useState } from "react";
import { PlayerModel } from "../models/PlayerModel";
import PlayerList from "./PlayerList";

function MainDashboard() {
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);

  return (
    <Container fluid>
      <Row className="justify-content-center mb-5">
        <Search setPlayerList={setPlayerList} />
      </Row>
      <Row>
        <Col lg={4}>
          <PlayerList playerList={playerList} setPlayerList={setPlayerList} />
        </Col>
        <Col className="mt-sm-5 mt-lg-0">
          <PlayerChart playerList={playerList} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainDashboard;
