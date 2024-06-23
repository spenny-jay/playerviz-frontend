import { Tabs, Tab } from "react-bootstrap";
import { useState, useReducer } from "react";
import MainDashboard from "../MainDashboard";
import DashboardTabTitle from "./DashboardTabTitle";
import { DashboardRequest } from "../../models/DashboardRequest";
import DashboardModal from "./DashboardModal";
import { DashboardResponse } from "../../models/DashboardResponse";
import { DashboardNameModel } from "../../models/DashboardNameModel";
import { getDashboardApi, saveDashboardApi } from "../../Api";
import { PlayerModel } from "../../models/PlayerModel";

/**
 * Parent class for the dashboards. User can toggle which dashboard
 * to render by selecting a presented tab. Can also add more tabs and rename
 * existing ones
 */
function DashboardTabs() {
  // selected tab to display contents
  const [activeTab, setActiveTab] = useState<string>("addTab");
  // reveals the create/load dashboard modal
  const [showModal, setShowModal] = useState<boolean>(true);
  // player data to render on graph
  const [currDashboard, setCurrDashboard] = useState<DashboardResponse>();
  // stores stats for the selected player for the StatsTable
  const [statsPlayer, setStatsPlayer] = useState<PlayerModel>();

  /**
   * Function used to switch tabs and populate dashboard data.
   * If the "addTab" dashboard is selected, prompt the modal
   * @param dashboardId What tab to reveal
   */
  const switchTab = async (tabId: string) => {
    if (tabId === "addTab") {
      setShowModal(true);
    } else if (tabId !== activeTab) {
      const dashboard = await getDashboardApi(tabId);
      loadDashboard(tabState, dashboard);
    }
  };

  /**
   * Renders data from a selected dashboard. Logic to handle duplicates
   * @param state
   * @param dashboard
   */
  const loadDashboard = (
    tabs: DashboardNameModel[],
    dashboard: DashboardResponse
  ) => {
    let tabState = tabs;
    // if the loaded dashboard is already present,
    // don't add a duplicate tab
    const dashboardExists: boolean = tabs.some(
      (el) => el.dashboardId === dashboard.dashboardId
    );
    if (!dashboardExists) {
      tabState = [
        ...tabs,
        {
          dashboardId: dashboard.dashboardId,
          dashboardName: dashboard.dashboardName,
        },
      ];
    }
    // render and reveal the dashboard's content
    setCurrDashboard(dashboard);
    setActiveTab(dashboard.dashboardId);
    setStatsPlayer(null);
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
        const { dashboard } = action;
        const newState = [...state, dashboard];
        setActiveTab(dashboard.dashboardId);
        setCurrDashboard(dashboard);
        return newState;
      // close a dashboard and its tab
      case "CLOSE":
        const { dashboardId } = action;
        const filteredTabs: DashboardNameModel[] = state.filter(
          (tab) => tab.dashboardId !== dashboardId
        );
        setCurrDashboard(null);
        return filteredTabs;
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
  const saveDashboard = async (
    dashboardId: string,
    dashboardName: string
  ): Promise<void> => {
    const dashboardReq: DashboardRequest = {
      playerIds: currDashboard.playerList.map((player) => player.Id),
      dashboardName: dashboardName,
      startYear: currDashboard.startYear,
      endYear: currDashboard.endYear,
      statCategory: currDashboard.statCategory,
    };

    const savedDashboardId: string = await saveDashboardApi(
      dashboardReq,
      dashboardId
    );
    if (savedDashboardId) {
      console.log(`Successfully saved dashboard: ${dashboardId}`);
    }
  };

  return (
    <>
      <Tabs
        activeKey={activeTab}
        justify
        onSelect={async (key) => await switchTab(key)}
      >
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

      {currDashboard && (
        <MainDashboard
          currDashboard={currDashboard}
          setCurrDashboard={setCurrDashboard}
          setStatsPlayer={setStatsPlayer}
          statsPlayer={statsPlayer}
        />
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
