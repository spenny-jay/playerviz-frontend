import { SetStateAction, Dispatch, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateDashboardForm from "./CreateDashboardForm";
import LoadDashboardForm from "./LoadDashboardForm";
import { DashboardNameModel } from "../../models/DashboardNameModel";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  tabDispatch: Dispatch<any>;
};

function DashboardModal({ showModal, setShowModal, tabDispatch }: Props) {
  const [selectedDashboards, setSelectedDashboards] = useState<
    DashboardNameModel[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("create");

  const submitDashboard = async () => {
    if (activeTab === "create") {
      selectedDashboards.forEach((selectedDashboard) => {
        tabDispatch({
          type: "ADD",
          dashboardName: selectedDashboard.dashboardName,
        });
      });
    } else if (activeTab === "load") {
      const res = await fetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/dashboards/dashboard/${selectedDashboards[0].dashboardId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const loadedDashboard = await res.json();
      console.log(loadedDashboard);
      tabDispatch({ type: "LOAD", dashboard: loadedDashboard });
    }

    setSelectedDashboards([]);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>Add Dashboard Form</Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} fill>
          <Tab eventKey="create" title="Create Dashboard">
            <CreateDashboardForm
              setSelectedDashboards={setSelectedDashboards}
            />
          </Tab>
          <Tab eventKey="load" title="Load Dashboard">
            <LoadDashboardForm
              selectedDashboards={selectedDashboards}
              setSelectedDashboards={setSelectedDashboards}
              tabDispatch={tabDispatch}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={() => submitDashboard()} variant="primary">
          Add Dashboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DashboardModal;
