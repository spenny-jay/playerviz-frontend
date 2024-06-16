import { useContext } from "react";
import Title from "./Title";
import { UserContext } from "../context/UserProvider";
import DashboardTabs from "../components/dashboards/DashboardTabs";
import AccessTabs from "../components/AccessTabs";

function MainContent() {
  const { token } = useContext(UserContext);
  return (
    <main className="primary-color">
      <Title />
      {token ? <DashboardTabs /> : <AccessTabs />}
    </main>
  );
}

export default MainContent;
