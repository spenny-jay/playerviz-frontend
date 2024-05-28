import { Container, Row, Col } from "react-bootstrap";
import SearchDropdown from "./SearchDropdown";
import PlayerChart from "./PlayerChart";
import { useState } from "react";
import { PlayerModel } from "../models/PlayerModel";
import SelectedPlayers from "./SelectedPlayers";

/**
 * Parent element for the contents related to displaying
 * charts and player data
 */
function MainDashboard() {
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);

  return (
    <Container className="p-3" fluid>
      <Row>
        <Col lg={4}>
          <SelectedPlayers
            playerList={playerList}
            setPlayerList={setPlayerList}
          />
        </Col>
        <Col className="mt-sm-5 mt-lg-2">
          <Row>
            <SearchDropdown setPlayerList={setPlayerList} />
          </Row>
          <Row>
            <PlayerChart playerList={playerList} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainDashboard;
