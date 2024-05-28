import { Row, Col, Image, CloseButton } from "react-bootstrap";
import { PlayerModel } from "../models/PlayerModel";
import { Dispatch, SetStateAction } from "react";

import classes from "./PlayerList.module.css";

type Props = {
  playerList: PlayerModel[];
  setPlayerList: Dispatch<SetStateAction<PlayerModel[]>>;
};

/**
 * List that shows which players are displayed on the chart
 * @param param0
 * @returns
 */
function SelectedPlayers({ playerList, setPlayerList }: Props) {
  const removePlayer = (index: number) => {
    setPlayerList(playerList.filter((_, i) => i !== index));
  };

  return (
    <div className={classes["player-list-container"]}>
      <div className={classes["header-wrapper"]}>
        <h3>Selected Players ({playerList.length})</h3>
      </div>
      <div className={classes["players-list"]}>
        {playerList.map((player: PlayerModel, index: number) => {
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
