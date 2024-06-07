import { LineChart } from "@mui/x-charts";
import { Form, Row, Col, Button } from "react-bootstrap";
import { SetStateAction, useEffect, useState } from "react";
import TeamColors from "../TeamColors.js";
import { StatsModel } from "../models/StatsModel";
import { DashboardResponse } from "../models/DashboardResponse";

type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};

/**
 * Contains the chart to display player data as well as
 * rendering logic
 * @param playerList: stores players to display
 */
function PlayerChart({ currDashboard, setCurrDashboard }: Props) {
  const [series, setSeries] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  // whenever a player is added or remove, update the chart
  useEffect(() => {
    renderGraph();
    console.log(currDashboard.playerList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currDashboard.playerList]);

  /**
   * Used to update the contents on the graph according
   * to the players stored in playerList
   * @param e
   */
  const renderGraph = (e?: React.FormEvent): void => {
    if (e) e.preventDefault();

    // remove years outside of the specified range
    const filteredStatsList = currDashboard.playerList.map((player) => {
      return player.Stats.filter(
        (stat) =>
          stat.Year >= currDashboard.startYear &&
          stat.Year <= currDashboard.endYear
      );
    });

    // gather x-axis data points and set chart metadata
    const dataPoints = filteredStatsList.map((stats, i) => ({
      data: generateDataPoints(stats),
      label: currDashboard.playerList[i].Player,
      curve: "linear",
      color: TeamColors[currDashboard.playerList[i].CurrentTeam],
    }));

    // generate tick marks for chart
    generateXAxisData();
    setSeries(dataPoints);
  };

  const generateXAxisData = (): void => {
    const years: number[] = [];
    for (
      var year = currDashboard.startYear;
      year <= currDashboard.endYear;
      year++
    )
      years.push(year);

    // data for the x-axis, update according to the years selected
    const xAxisPoints = [
      {
        data: years,
        dataKey: "year",
        tickInterval: years,
        valueFormatter: (year) => `${year}`,
      },
    ];

    setXAxis(xAxisPoints);
  };

  const generateDataPoints = (stats: StatsModel[]): number[] => {
    const res: number[] = [];
    if (stats.length === 0) return res;

    let idx = 0;
    const startDataPoint = stats[0].Year;
    const endDataPoint = stats[stats.length - 1].Year;

    // iterate through every year the user set to illustrate
    for (
      let currYear = currDashboard.startYear;
      currYear <= currDashboard.endYear && stats.length > 0;
      currYear++
    ) {
      // null years where a player did not play
      if (currYear !== stats[idx].Year) {
        res.push(null);
      } else {
        // if the year is within the specified bounds, add the stat
        currYear >= startDataPoint && currYear <= endDataPoint
          ? res.push(stats[idx++][currDashboard.statCategory])
          : res.push(null);
      }
    }
    return res;
  };

  return (
    <Form onSubmit={(e) => renderGraph(e)}>
      <Row className="mt-2">
        <Col>
          <Form.Group controlId="startYear">
            <Form.Label>Start Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Start Year"
              value={currDashboard.startYear}
              onChange={(e) =>
                setCurrDashboard({
                  ...currDashboard,
                  startYear: +e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="endYear">
            <Form.Label>End Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="End Year"
              value={currDashboard.endYear}
              onChange={(e) =>
                setCurrDashboard({
                  ...currDashboard,
                  endYear: +e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="stat">
            <Form.Label>Stat</Form.Label>
            <Form.Select
              value={currDashboard.statCategory}
              onChange={(e) =>
                setCurrDashboard({
                  ...currDashboard,
                  statCategory: e.target.value,
                })
              }
            >
              <option>YDS</option>
              <option>GP</option>
              <option>TD</option>
              <option>INT</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Button style={{ marginTop: "32px", width: "100%" }} type="submit">
            Submit
          </Button>
        </Col>
      </Row>

      <Row>
        <LineChart
          xAxis={xAxis}
          yAxis={[{ scaleType: "linear", min: 0 }]}
          slotProps={{ legend: { hidden: true } }}
          series={series}
          width={650}
          height={400}
        />
      </Row>
    </Form>
  );
}

export default PlayerChart;
