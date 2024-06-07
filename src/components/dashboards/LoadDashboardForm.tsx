import { useEffect, useState, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { DashboardNameModel } from "../../models/DashboardNameModel";
import { getUserDashboardApi } from "../../Api";

type Props = {
  setSelectedDashboard: React.Dispatch<SetStateAction<DashboardNameModel>>;
};

function LoadDashboardForm({ setSelectedDashboard }: Props) {
  const [dashboardOptions, setDashboardOptions] = useState<
    DashboardNameModel[]
  >([]);

  useEffect(() => {
    const retrievedDashboards = async () => await getUserDashboards();
    retrievedDashboards();
  }, []);

  const getUserDashboards = async () => {
    try {
      const dashboardNames: DashboardNameModel[] = await getUserDashboardApi();
      setDashboardOptions(dashboardNames);
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
          onChange={(selected: DashboardNameModel[]) =>
            setSelectedDashboard(selected[0])
          }
        />
      </Form.Group>
    </>
  );
}

export default LoadDashboardForm;
