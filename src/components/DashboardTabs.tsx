import { Tabs, Tab } from "react-bootstrap";
import { useState, useContext } from "react";
import MainDashboard from "./MainDashboard";
import DashboardTabTitle from "./DashboardTabTitle";
import { v4 as uuidv4 } from "uuid";
import { PlayerModel } from "../models/PlayerModel";
import { PlayerFormContext } from "../context/PlayerFormProvider";
import { DashboardRequest } from "../models/DashboardRequest";
import { UserContext } from "../context/UserProvider";

function DashboardTabs() {
  const [tabs, setTabs] = useState([
    {
      title: "Untitled Dashboard",
      dashboardId: uuidv4(),
    },
  ]);
  const [playerList, setPlayerList] = useState<PlayerModel[]>([]);
  const { playerForm } = useContext(PlayerFormContext);
  const { userId } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState<string>(tabs[0].dashboardId);

  const handleTabSelect = (dashboardId: string): void => {
    if (dashboardId === "addTab") {
      const newDashboardId = uuidv4();
      setTabs([
        ...tabs,
        { title: "Untitled Dashboard", dashboardId: newDashboardId },
      ]);
      setActiveTab(newDashboardId);
    } else {
      setActiveTab(dashboardId);
    }
  };

  const deleteTab = (dashboardId: string) => {
    if (tabs.length > 1) {
      setTabs((tabs) => tabs.filter((tab) => tab.dashboardId !== dashboardId));
    }
    setActiveTab(tabs[tabs.length - 1].dashboardId);
  };

  const updateTab = (dashboardId: string, title: string) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.dashboardId === dashboardId) {
          tab.title = title;
        }
        return tab;
      })
    );
  };

  const saveDashboard = async (dashboardId: string, title: string) => {
    const dashboardReq: DashboardRequest = {
      playerIds: playerList.map((player) => player.Id),
      dashboardName: title,
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
  };

  return (
    <Tabs activeKey={activeTab} onSelect={(k) => handleTabSelect(k)}>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.dashboardId}
            eventKey={tab.dashboardId}
            title={
              <DashboardTabTitle
                title={tab.title}
                dashboardId={tab.dashboardId}
                updateTitle={updateTab}
                deleteDashboard={deleteTab}
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
      <Tab eventKey="addTab" title="+ New Dashboard" />
    </Tabs>
  );
}

export default DashboardTabs;
