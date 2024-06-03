import { Tabs, Tab } from "react-bootstrap";
import { useState, useContext, useReducer } from "react";
import MainDashboard from "../MainDashboard";
import DashboardTabTitle from "./DashboardTabTitle";
import { v4 as uuidv4 } from "uuid";
import { PlayerModel } from "../../models/PlayerModel";
import { PlayerFormContext } from "../../context/PlayerFormProvider";
import { DashboardRequest } from "../../models/DashboardRequest";
import DashboardModal from "./DashboardModal";
import { GetAsync, PostAsync } from "../Globals";
import { DashboardResponse } from "../../models/DashboardResponse";
import { DashboardNameModel } from "../../models/DashboardNameModel";

function DashboardTabs() {
  // selected tab to display contents
  const [activeTab, setActiveTab] = useState<string>();
  // reveals the create/load dashboard modal
  const [showModal, setShowModal] = useState<boolean>(true);
  // player data to render on graph
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);
  // lifts player chart form data for requests here
  const { playerForm, setPlayerForm } = useContext(PlayerFormContext);

  /**
   * Function used to switch tabs and populate dashboard data.
   * If the "addTab" dashboard is selected, prompt the modal
   * @param dashboardId What tab to reveal
   */
  const switchTab = async (tabId: string) => {
    if (tabId === "addTab") {
      setShowModal(true);
    } else if (tabId !== activeTab) {
      const dashboard = await GetAsync<DashboardResponse>(
        `api/dashboards/dashboard/${tabId}`
      );

      loadDashboard(tabState, dashboard);
    }
  };

  /**
   * Renders data from a selected dashboard. Logic to handle duplicates
   * @param state
   * @param dashboard
   * @returns
   */
  const loadDashboard = (
    state: DashboardNameModel[],
    dashboard: DashboardResponse
  ) => {
    let tabState = state;

    // if the loaded dashboard is already present,
    // don't add a duplicate tab
    const dashboardExists: boolean = state.some(
      (el) => el.dashboardId === dashboard.dashboardId
    );
    if (!dashboardExists) {
      tabState = [
        ...state,
        {
          dashboardId: dashboard.dashboardId,
          dashboardName: dashboard.dashboardName,
        },
      ];
    }
    // render and reveal the dashboard's content
    setPlayerList(dashboard.playerList);
    setPlayerForm({
      startYear: dashboard.startYear,
      endYear: dashboard.endYear,
      statCategory: dashboard.statCategory,
    });
    setActiveTab(dashboard.dashboardId);
    return tabState;
  };

  /**
   * Manages the state of the tabs
   * @param state Current state of the tabs
   * @param action Defines the action to execute and data to modify
   * state with
   * @returns updated state
   */
  const tabReducer = (state: DashboardNameModel[], action) => {
    switch (action.type) {
      // update the edited name of a dashboard
      case "UPDATE":
        return state.map((tab) => {
          if (tab.dashboardId === action.dashboardId) {
            tab.dashboardName = action.dashboardName;
          }
          return tab;
        });
      // add a new dashboard and tab
      case "ADD":
        const newDashboardId = uuidv4();
        const newState = [
          ...state,
          {
            dashboardName: action.dashboardName || "Untitled Dashboard",
            dashboardId: newDashboardId,
          },
        ];
        setActiveTab(newDashboardId);
        return newState;
      // delete a dashboard and its tab
      case "DELETE":
        const deleteState = state.filter(
          (tab) => tab.dashboardId !== action.dashboardId
        );
        // switch to another tab or prompt the user to add/load a new dashboard
        const tabSwitch = async () => {
          deleteState.length >= 1
            ? await switchTab(deleteState[deleteState.length - 1].dashboardId)
            : await switchTab("addTab");
        };
        tabSwitch();
        return deleteState;
      // load a dashboard from the backend and render it
      case "LOAD":
        return loadDashboard(state, action.dashboard);
      default:
        return state;
    }
  };

  // used to manage the state of the tabs on the screen
  const [tabState, tabDispatch] = useReducer(tabReducer, []);

  /**
   * Saves a provided dashboard upon clicking the save icon
   * @param dashboardId
   * @param dashboardName
   */
  const saveDashboard = async (dashboardId: string, dashboardName: string) => {
    const dashboardReq: DashboardRequest = {
      playerIds: playerList.map((player) => player.Id),
      dashboardName: dashboardName,
      dashboardId: dashboardId,
      startYear: playerForm.startYear,
      endYear: playerForm.endYear,
      statCategory: playerForm.statCategory,
    };

    const savedDashboardId: string = await PostAsync<string, DashboardRequest>(
      `api/dashboards/`,
      dashboardReq
    );
    if (savedDashboardId) {
      console.log(`Successfully saved dashboard ${savedDashboardId}`);
    }
  };

  return (
    <>
      <Tabs activeKey={activeTab} justify onSelect={(key) => switchTab(key)}>
        {tabState.map((tab) => {
          return (
            <Tab
              key={tab.dashboardId}
              eventKey={tab.dashboardId}
              title={
                <DashboardTabTitle
                  dashboardName={tab.dashboardName}
                  dashboardId={tab.dashboardId}
                  tabDispatch={tabDispatch}
                  saveDashboard={saveDashboard}
                  isActive={activeTab === tab.dashboardId}
                />
              }
            />
          );
        })}
        <Tab eventKey="addTab" title="+ Dashboard" />
      </Tabs>

      {tabState.length >= 1 && (
        <MainDashboard playerList={playerList} setPlayerList={setPlayerList} />
      )}

      {showModal && (
        <DashboardModal
          showModal={showModal}
          setShowModal={setShowModal}
          tabDispatch={tabDispatch}
        />
      )}
    </>
  );
}

export default DashboardTabs;
