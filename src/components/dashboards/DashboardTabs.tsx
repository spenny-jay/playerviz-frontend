import { Tabs, Tab } from "react-bootstrap";
import { useState, useContext, useReducer } from "react";
import MainDashboard from "../MainDashboard";
import DashboardTabTitle from "./DashboardTabTitle";
import { v4 as uuidv4 } from "uuid";
import { PlayerModel } from "../../models/PlayerModel";
import { PlayerFormContext } from "../../context/PlayerFormProvider";
import { DashboardRequest } from "../../models/DashboardRequest";
import DashboardModal from "./DashboardModal";
import { DashboardNameModel } from "../../models/DashboardNameModel";

const initTabs: DashboardNameModel[] = [
  {
    dashboardName: "Untitled Dashboard",
    dashboardId: uuidv4(),
  },
];

function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<string>(initTabs[0].dashboardId);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);
  const { playerForm, setPlayerForm } = useContext(PlayerFormContext);

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
        return state.filter((tab) => tab.dashboardId !== action.dashboardId);
      case "LOAD":
        console.log(action.dashboard);
        const dashboard = action.dashboard;
        setPlayerList(dashboard.playerList);
        setPlayerForm({
          startYear: dashboard.startYear,
          endYear: dashboard.endYear,
          statCategory: dashboard.statCategory,
        });
        const tabState = [
          ...state,
          {
            dashboardId: dashboard.dashboardId,
            dashboardName: dashboard.dashboardName,
          },
        ];
        setActiveTab(dashboard.dashboardId);
        console.log(tabState);
        console.log(playerList);
        return tabState;
      default:
        return state;
    }
  };

  const [tabState, tabDispatch] = useReducer(tabReducer, initTabs);

  const saveDashboard = async (dashboardId: string, dashboardName: string) => {
    const dashboardReq: DashboardRequest = {
      playerIds: playerList.map((player) => player.Id),
      dashboardName: dashboardName,
      dashboardId: dashboardId,
      startYear: playerForm.startYear,
      endYear: playerForm.endYear,
      statCategory: playerForm.statCategory,
    };

    console.log(dashboardReq);
    const res = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/api/dashboards/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(dashboardReq),
      }
    );
    const savedDashboardId: string = await res.json();
    console.log(savedDashboardId);
    if (savedDashboardId) {
      console.log(`Successfully saved dashboard ${savedDashboardId}`);
    }
  };

  const switchTab = (key: string) =>
    key === "addTab" ? setShowModal(true) : setActiveTab(key);

  return (
    <>
      <Tabs activeKey={activeTab} onSelect={(key) => switchTab(key)}>
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
            >
              <MainDashboard
                playerList={playerList}
                setPlayerList={setPlayerList}
              />
            </Tab>
          );
        })}
        <Tab eventKey="addTab" title="+ Dashboard" />
      </Tabs>

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
