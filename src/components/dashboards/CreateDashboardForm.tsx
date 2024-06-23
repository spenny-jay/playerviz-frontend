import { Form } from "react-bootstrap";
import { DashboardNameModel } from "../../models/DashboardNameModel";
import { SetStateAction } from "react";

type Props = {
  setSelectedDashboard: React.Dispatch<SetStateAction<DashboardNameModel>>;
};

/**
 * Form to create a new dashboard for the user. Prompts them to
 * fill out a dashboard name and type (WIP)
 */
function CreateDashboardForm({ setSelectedDashboard }: Props) {
  return (
    <>
      <Form.Group className="mt-3" controlId="dashboard-name">
        <Form.Label>Dashboard Name</Form.Label>
        <Form.Control
          onChange={(e) =>
            setSelectedDashboard({
              dashboardId: null,
              dashboardName: e.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="dashboard-type">
        <Form.Label>Dashboard Type</Form.Label>
        <Form.Select>
          <option>QB</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}

export default CreateDashboardForm;
