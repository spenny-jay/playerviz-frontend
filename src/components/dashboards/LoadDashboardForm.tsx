import { useEffect, useState, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { DashboardNameModel } from "../../models/DashboardNameModel";
import { GetAsync } from "../Globals";

type Props = {
  selectedDashboards: DashboardNameModel[];
  setSelectedDashboards: React.Dispatch<SetStateAction<DashboardNameModel[]>>;
};

function LoadDashboardForm({
  selectedDashboards,
  setSelectedDashboards,
}: Props) {
  const [dashboardOptions, setDashboardOptions] = useState<
    DashboardNameModel[]
  >([]);

  useEffect(() => {
    const retrievedDashboards = async () => getUserDashboards();
    retrievedDashboards();
  }, []);

  const getUserDashboards = async () => {
    try {
      const dashboards = await GetAsync(`api/dashboards/`);
      setDashboardOptions(dashboards["dashboardNames"]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Form.Group className="mt-3" controlId="load-dropdown">
        <Form.Label>Load existing dashboard</Form.Label>
        <Typeahead
          id="load-dropdown"
          labelKey={(option) => `${option["dashboardName"]}`}
          filterBy={["dashboardName"]}
          placeholder="Select a dashboard..."
          options={dashboardOptions}
          selected={selectedDashboards}
          onChange={(selected: DashboardNameModel[]) =>
            setSelectedDashboards(selected)
          }
        />
      </Form.Group>
    </>
  );
}

export default LoadDashboardForm;
