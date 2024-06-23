import { Container, Row, Col } from "react-bootstrap";
import PlayerChart from "./PlayerChart";
import SelectedPlayers from "./SelectedPlayers";
import { SetStateAction, useState } from "react";
import { DashboardResponse } from "../models/DashboardResponse";
import PlayerFilterForm from "./dashboards/PlayerFilterForm";

import classes from "./MainDashboard.module.css";
import StatsTable from "./StatsTable";
import { PlayerModel } from "../models/PlayerModel";

type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};

/**
 * Parent element for the contents related to displaying
 * charts and player data
 */
function MainDashboard({ currDashboard, setCurrDashboard }: Props) {
  // stores stats for the selected player for the StatsTable
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
            <PlayerChart currDashboard={currDashboard} />
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
