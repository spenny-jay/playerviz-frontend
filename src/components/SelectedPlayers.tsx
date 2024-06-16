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
 * List that shows which players are displayed on the chart
 * @param param0
 * @returns
 */
function SelectedPlayers({
  currDashboard,
  setCurrDashboard,
  setStatsPlayer,
  statsPlayer,
}: Props) {
  const removePlayer = (index: number) => {
    setCurrDashboard({
      ...currDashboard,
      playerList: currDashboard.playerList.filter((_, i) => i !== index),
    });
  };

  return (
    <Container className={`${classes["players-list"]} mt-3`}>
      {currDashboard.playerList.map((player: PlayerModel, index: number) => {
        return (
          <div key={player.Id} onClick={() => setStatsPlayer(player)}>
            <Row
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
              <span className={classes["close-btn"]}>
                <CloseButton onClick={() => removePlayer(index)} />
              </span>
            </Row>
          </div>
        );
      })}
    </Container>
  );
}

export default SelectedPlayers;
