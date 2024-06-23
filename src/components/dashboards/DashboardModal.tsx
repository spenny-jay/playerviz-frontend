import { SetStateAction, Dispatch, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateDashboardForm from "./CreateDashboardForm";
import LoadDashboardForm from "./LoadDashboardForm";
import { DashboardNameModel } from "../../models/DashboardNameModel";
import { DashboardResponse } from "../../models/DashboardResponse";
import { DashboardRequest } from "../../models/DashboardRequest";
import { createDashboardApi, getDashboardApi } from "../../Api";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  tabDispatch: Dispatch<any>;
};

/**
 * Modal that prompts the user to load or save a new dashboard
 */
function DashboardModal({ showModal, setShowModal, tabDispatch }: Props) {
  // dashboard to load/create
  const [selectedDashboard, setSelectedDashboard] =
    useState<DashboardNameModel>({ dashboardId: null, dashboardName: null });
  // which form to present (load or create dashboard form)
  const [activeTab, setActiveTab] = useState<string>("create");

  // Upon submitting a form, either retrieve or create a new dashboard
  // depending on which tab is accessed
  const submitDashboard = async () => {
    let loadedDashboard: DashboardResponse =
      activeTab === "create"
        ? await createDashboard()
        : await getDashboardApi(selectedDashboard.dashboardId);
    tabDispatch({ type: "LOAD", dashboard: loadedDashboard });
    setShowModal(false);
  };

  /**
   * Will execute when a dashboard has been created. Save a new
   * dashboard with default values for the user
   */
  const createDashboard = async (): Promise<DashboardResponse> => {
    const dashboard: DashboardRequest = {
      dashboardName: selectedDashboard.dashboardName,
      playerIds: [],
      startYear: 2020,
      endYear: 2023,
      statCategory: "YDS",
    };
    const savedDashboardId = await createDashboardApi(dashboard);

    if (savedDashboardId) {
      return {
        ...dashboard,
        playerList: [],
        dashboardId: savedDashboardId,
      };
    }
    return null;
  };

  // close the modal when clicked outside of it
  const handleClose = () => setShowModal(false);

  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>Add Dashboard Form</Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} fill>
          <Tab eventKey="create" title="Create Dashboard">
            <CreateDashboardForm setSelectedDashboard={setSelectedDashboard} />
          </Tab>
          <Tab eventKey="load" title="Load Dashboard">
            <LoadDashboardForm setSelectedDashboard={setSelectedDashboard} />
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
