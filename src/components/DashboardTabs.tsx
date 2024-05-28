import { Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import MainDashboard from "./MainDashboard";

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
          <Tab key={keys.key} eventKey={keys.key} title={keys.key}>
            <MainDashboard />
          </Tab>
        );
      })}
      <Tab eventKey="addTab" title="+ New Dashboard" />
    </Tabs>
  );
}

export default DashboardTabs;
