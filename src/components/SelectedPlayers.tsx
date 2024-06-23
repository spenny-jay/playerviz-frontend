import { Row, Col, Image, CloseButton, Container } from "react-bootstrap";
import { PlayerModel } from "../models/PlayerModel";
import { SetStateAction } from "react";

import classes from "./SelectedPlayers.module.css";
import { DashboardResponse } from "../models/DashboardResponse";

type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
  setStatsPlayer: React.Dispatch<SetStateAction<PlayerModel>>;
  statsPlayer: PlayerModel;
};

/**
 * List that shows which players are displayed on the chart. Can select
 * a player entry to populate the StatsTable component
 */
function SelectedPlayers({
  currDashboard,
  setCurrDashboard,
  setStatsPlayer,
  statsPlayer,
}: Props) {
  const removePlayer = (index: number) => {
    const playerToRemove: PlayerModel = currDashboard.playerList[index];
    if (playerToRemove.Id === statsPlayer?.Id) {
      setStatsPlayer(null);
    }
    setCurrDashboard({
      ...currDashboard,
      playerList: currDashboard.playerList.filter((_, i) => i !== index),
    });
    console.log(currDashboard.playerList);
  };

  return (
    <Container className={`${classes["players-list"]} mt-3`}>
      {currDashboard.playerList.map((player: PlayerModel, statIdx: number) => {
        return (
          <div className={classes["row-wrapper"]} key={player.Id}>
            <CloseButton
              className={`${classes["close-btn"]}`}
              onClick={() => removePlayer(statIdx)}
            />
            <Row
              onClick={() => setStatsPlayer(player)}
              className={`${classes["row"]} ${
                statsPlayer?.Player === player.Player ? classes["active"] : ""
              }`}
            >
              <Col>
                <Image
                  className={classes["profile-pic"]}
                  src={player.ProfileUrl}
                  key={player.ProfileUrl}
                  rounded
                  fluid
                />
              </Col>
              <Col>{player.Player}</Col>
              <Col>{player.CurrentTeam}</Col>
            </Row>
          </div>
        );
      })}
    </Container>
  );
}

export default SelectedPlayers;
