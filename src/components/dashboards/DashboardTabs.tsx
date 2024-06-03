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

function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);
  const { playerForm, setPlayerForm } = useContext(PlayerFormContext);

  const switchTab = async (dashboardId: string) => {
    if (dashboardId === "addTab") {
      setShowModal(true);
      setPlayerList([]);
      return;
    }

    const dashboard = await GetAsync<DashboardResponse>(
      `api/dashboards/dashboard/${dashboardId}`
    );
    setPlayerList(dashboard.playerList);
    setPlayerForm({
      startYear: dashboard.startYear,
      endYear: dashboard.endYear,
      statCategory: dashboard.statCategory,
    });
    setActiveTab(dashboard.dashboardId);
  };

  const loadDashboard = (state, dashboard) => {
    let tabState = state;

    const dashboardExists = state.some(
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
    setPlayerList(dashboard.playerList);
    setPlayerForm({
      startYear: dashboard.startYear,
      endYear: dashboard.endYear,
      statCategory: dashboard.statCategory,
    });
    setActiveTab(dashboard.dashboardId);
    return tabState;
  };

  const tabReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return state.map((tab) => {
          if (tab.dashboardId === action.dashboardId) {
            tab.dashboardName = action.dashboardName;
          }
          return tab;
        });
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
      case "DELETE":
        const deleteState = state.filter(
          (tab) => tab.dashboardId !== action.dashboardId
        );
        const tabSwitch = async () => {
          deleteState.length >= 1
            ? await switchTab(deleteState[deleteState.length - 1].dashboardId)
            : await switchTab("addTab");
        };
        tabSwitch();
        return deleteState;
      case "LOAD":
        return loadDashboard(state, action.dashboard);
      default:
        return state;
    }
  };

  const [tabState, tabDispatch] = useReducer(tabReducer, []);

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
            ></Tab>
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
