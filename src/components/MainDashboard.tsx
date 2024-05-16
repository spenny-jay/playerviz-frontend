import { Container, Row, Col } from "react-bootstrap";
import Search from "./Search";
import PlayerChart from "./PlayerChart";
import { useState } from "react";
import { PlayerModel } from "../models/PlayerModel";
import SelectedPlayers from "./SelectedPlayers";

/**
 * Parent element for the contents related to displaying
 * charts and player data
 * @returns
 */
function MainDashboard() {
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);

  return (
    <Container fluid>
      <Row className="justify-content-center mb-5">
        <Search setPlayerList={setPlayerList} />
      </Row>
      <Row>
        <Col lg={4}>
          <SelectedPlayers
            playerList={playerList}
            setPlayerList={setPlayerList}
          />
        </Col>
        <Col className="mt-sm-5 mt-lg-0">
          <PlayerChart playerList={playerList} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainDashboard;
