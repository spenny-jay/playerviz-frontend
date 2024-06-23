import { useContext } from "react";
import Title from "./Title";
import { UserContext } from "../context/UserProvider";
import DashboardTabs from "../components/dashboards/DashboardTabs";
import AccessTabs from "../components/AccessTabs";

function MainContent() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <main className="primary-color">
      <Title />
      {isLoggedIn ? <DashboardTabs /> : <AccessTabs />}
    </main>
  );
}

export default MainContent;
