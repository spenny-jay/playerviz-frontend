import { Container, Row, Col } from "react-bootstrap";
import SearchDropdown from "./SearchDropdown";
import PlayerChart from "./PlayerChart";
import SelectedPlayers from "./SelectedPlayers";
import { SetStateAction } from "react";
import { DashboardResponse } from "../models/DashboardResponse";

/**
 * Parent element for the contents related to displaying
 * charts and player data
 */
type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};

function MainDashboard({ currDashboard, setCurrDashboard }: Props) {
  return (
    <Container className="p-3" fluid>
      <Row>
        <Col lg={4}>
          <SelectedPlayers
            currDashboard={currDashboard}
            setCurrDashboard={setCurrDashboard}
          />
        </Col>
        <Col className="mt-sm-5 mt-lg-2">
          <Row>
            <SearchDropdown setCurrDashboard={setCurrDashboard} />
          </Row>
          <Row>
            <PlayerChart
              currDashboard={currDashboard}
              setCurrDashboard={setCurrDashboard}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MainDashboard;
