import { Row, Col, Image, CloseButton } from "react-bootstrap";
import { PlayerModel } from "../models/PlayerModel";
import { SetStateAction } from "react";

import classes from "./SelectedPlayers.module.css";
import { DashboardResponse } from "../models/DashboardResponse";

type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};

/**
 * List that shows which players are displayed on the chart
 * @param param0
 * @returns
 */
function SelectedPlayers({ currDashboard, setCurrDashboard }: Props) {
  const removePlayer = (index: number) => {
    setCurrDashboard({
      ...currDashboard,
      playerList: currDashboard.playerList.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={classes["player-list-container"]}>
      <div className={classes["header-wrapper"]}>
        <h3>Selected Players ({currDashboard.playerList.length})</h3>
      </div>
      <div className={classes["players-list"]}>
        {currDashboard.playerList.map((player: PlayerModel, index: number) => {
          return (
            <div key={player.Id}>
              <Row className={`${classes["row"]}`}>
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
      </div>
    </div>
  );
}

export default SelectedPlayers;
