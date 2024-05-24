import { Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import MainDashboard from "./MainDashboard";

// idea:
// 1. user logins
// 2. retrieve dashboard metadata {key: <name of dashboard>, dashboardId}
// 3. useEffect to retrieve the selected tab's dashboard
// 4. retrieve playerList to pass to MainDashboard

function DashboardTabs() {
  const [keys, setKeys] = useState([
    {
      key: "Init",
      dashboardId: "",
    },
  ]);
  const [activeTab, setActiveTab] = useState("Init");

  const handleTabSelect = (key: string): void => {
    if (key === "addTab") {
      setKeys([
        ...keys,
        { key: "lol" + keys.length, dashboardId: "asdasdasda" },
      ]);
      setActiveTab("lol" + keys.length);
    } else {
      setActiveTab(key);
    }
  };

  return (
    <Tabs activeKey={activeTab} onSelect={(k) => handleTabSelect(k)}>
      {keys.map((keys) => {
        return (
          <Tab eventKey={keys.key} title={keys.key}>
            <MainDashboard />
          </Tab>
        );
      })}
      <Tab eventKey="addTab" title="+ New Dashboard" />
    </Tabs>
  );
}

export default DashboardTabs;
