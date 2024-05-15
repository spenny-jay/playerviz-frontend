import { LineChart } from "@mui/x-charts";
import { PlayerModel } from "../models/PlayerModel";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

type Props = {
  playerList: PlayerModel[];
};

function PlayerChart({ playerList }: Props) {
  const [startYear, setStartYear] = useState<number>(2020);
  const [endYear, setEndYear] = useState<number>(2023);
  const [statCategory, setStatCategory] = useState("YDS");

  const [series, setSeries] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  const renderGraph = (e) => {
    e.preventDefault();

    // remove years outside of the specified range
    const filteredStatsList = playerList.map((player) => {
      return player.Stats.filter(
        (stat) => stat.Year >= startYear && stat.Year <= endYear
      );
    });

    // gather x-axis data points and set chart metadata
    const dataPoints = filteredStatsList.map((stats, i) => ({
      data: generateDataPoints(stats),
      label: playerList[i].Player,
      curve: "linear",
    }));

    // generate tick marks for chart
    const years = [];
    for (var year = startYear; year <= endYear; year++) years.push(year);

    const xAxisPoints = [
      {
        data: years,
        dataKey: "year",
        tickInterval: years,
        valueFormatter: (year) => `${year}`,
      },
    ];

    setXAxis(xAxisPoints);
    setSeries(dataPoints);
  };

  const generateDataPoints = (stats) => {
    const res = [];
    let idx = 0;
    const startDataPoint = stats.length !== 0 ? stats[0].Year : 0;
    const endDataPoint =
      stats.length !== 0 ? stats[stats.length - 1].Year : 9999;
    console.log(stats);
    for (
      let currYear = startYear;
      currYear <= endYear && stats.length > 0;
      currYear++
    ) {
      currYear >= startDataPoint && currYear <= endDataPoint
        ? res.push(stats[idx++][statCategory])
        : res.push(null);
    }
    return res;
  };

  return (
    <Form onSubmit={(e) => renderGraph(e)}>
      <Row>
        <Col>
          <Form.Control
            type="number"
            placeholder="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(+e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="End Year"
            value={endYear}
            onChange={(e) => setEndYear(+e.target.value)}
          />
        </Col>
        <Col>
          <Form.Select
            value={statCategory}
            onChange={(e) => setStatCategory(e.target.value)}
          >
            <option>YDS</option>
            <option>GP</option>
            <option>TD</option>
            <option>INT</option>
          </Form.Select>
        </Col>
        <Col>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
      <Row>
        <LineChart
          xAxis={xAxis}
          yAxis={[{ scaleType: "linear", min: 0 }]}
          series={series}
          width={650}
          height={400}
        />
      </Row>
    </Form>
  );
}

export default PlayerChart;
