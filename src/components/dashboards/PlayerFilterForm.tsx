import { Col, Form, Row } from "react-bootstrap";
import { DashboardResponse } from "../../models/DashboardResponse";
import { SetStateAction } from "react";
import SearchDropdown from "../SearchDropdown";

type Props = {
  currDashboard: DashboardResponse;
  setCurrDashboard: React.Dispatch<SetStateAction<DashboardResponse>>;
};

/**
 * User can set the start year, end year, and stat category
 * for the data visualization
 */
function PlayerFilterForm({ currDashboard, setCurrDashboard }: Props) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <h2>Selected Players</h2>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="startYear">
            <Form.Label>Start Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Start Year"
              value={currDashboard.startYear}
              onChange={(e) => {
                setCurrDashboard({
                  ...currDashboard,
                  startYear: +e.target.value,
                });
              }}
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
              onChange={(e) => {
                setCurrDashboard({
                  ...currDashboard,
                  endYear: +e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="stat">
            <Form.Label>Stat</Form.Label>
            <Form.Select
              value={currDashboard.statCategory}
              onChange={(e) => {
                setCurrDashboard({
                  ...currDashboard,
                  statCategory: e.target.value,
                });
              }}
            >
              <option>YDS</option>
              <option>AVG</option>
              <option>TD</option>
              <option>INT</option>
              <option>ATT</option>
              <option>CMP</option>
              <option>CMP%</option>
              <option>RTG</option>
              <option>SACK</option>
              <option>LNG</option>
              <option>GP</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="pt-2">
        <SearchDropdown setCurrDashboard={setCurrDashboard} />
      </Row>
    </Form>
  );
}

export default PlayerFilterForm;
