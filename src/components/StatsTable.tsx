import { Table } from "react-bootstrap";
import { PlayerModel } from "../models/PlayerModel";
import classes from "./StatsTable.module.css";

type Props = {
  player: PlayerModel;
};

/**
 * Upon a player being selected, it will render a table
 * with their data in a tabular format
 */
function StatsTable({ player }: Props) {
  const keys = player?.Stats ? Object.keys(player.Stats[0]) : [];

  return (
    <>
      <h2>{player.Player} Stats</h2>
      <div className={classes["table-container"]}>
        <Table responsive="sm">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {player.Stats.map((year) => {
              return (
                <tr>
                  {keys.map((key, i) => (
                    <td key={`${key}-${i}`}>{year[key]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default StatsTable;
