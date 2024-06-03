import { useEffect, useState, SetStateAction, Dispatch } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { DashboardNameModel } from "../../models/DashboardNameModel";

type Props = {
  selectedDashboards: DashboardNameModel[];
  setSelectedDashboards: React.Dispatch<SetStateAction<DashboardNameModel[]>>;
  tabDispatch: Dispatch<any>;
};

function LoadDashboardForm({
  selectedDashboards,
  setSelectedDashboards,
  tabDispatch,
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
      const res = await fetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/dashboards/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const dashboards = await res.json();
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
