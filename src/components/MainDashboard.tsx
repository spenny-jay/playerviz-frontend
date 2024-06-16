import { Container, Row, Col } from "react-bootstrap";
import PlayerChart from "./PlayerChart";
import SelectedPlayers from "./SelectedPlayers";
import { SetStateAction, useState } from "react";
import { DashboardResponse } from "../models/DashboardResponse";
import PlayerFilterForm from "./dashboards/PlayerFilterForm";

import classes from "./MainDashboard.module.css";
import StatsTable from "./StatsTable";
import { PlayerModel } from "../models/PlayerModel";

/**
 * Parent element for the contents related to displaying
 * charts and player data
 */
type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};
function MainDashboard({ currDashboard, setCurrDashboard }: Props) {
  const [statsPlayer, setStatsPlayer] = useState<PlayerModel>();

  return (
    <Container className="p-3" fluid>
      <Row>
        <Col className={`${classes["dashboard-container"]} p-3`} lg={4}>
          <PlayerFilterForm
            currDashboard={currDashboard}
            setCurrDashboard={setCurrDashboard}
          />
          <SelectedPlayers
            currDashboard={currDashboard}
            setCurrDashboard={setCurrDashboard}
            setStatsPlayer={setStatsPlayer}
            statsPlayer={statsPlayer}
          />
        </Col>

        <Col>
          <div className={`${classes["dashboard-container"]} p-3`}>
            <PlayerChart
              currDashboard={currDashboard}
              setCurrDashboard={setCurrDashboard}
            />
            <div>
              {statsPlayer ? (
                <StatsTable player={statsPlayer} />
              ) : (
                <h2>Select a player to reveal their yearly stats...</h2>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Col></Col>
    </Container>
  );
}

export default MainDashboard;
