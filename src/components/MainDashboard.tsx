import { Container, Row, Col } from "react-bootstrap";
import SearchDropdown from "./SearchDropdown";
import PlayerChart from "./PlayerChart";
import SelectedPlayers from "./SelectedPlayers";
import { PlayerModel } from "../models/PlayerModel";
import { SetStateAction } from "react";

/**
 * Parent element for the contents related to displaying
 * charts and player data
 */
type Props = {
  playerList: PlayerModel[];
  setPlayerList: React.Dispatch<SetStateAction<PlayerModel[]>>;
};

function MainDashboard({ playerList, setPlayerList }: Props) {
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
