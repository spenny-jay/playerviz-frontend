import { useContext } from "react";
import Title from "./Title";
import { UserContext } from "../context/UserProvider";
import DashboardTabs from "../components/dashboards/DashboardTabs";
import AccessTabs from "../components/AccessTabs";
import { PlayerFormProvider } from "../context/PlayerFormProvider";

function MainContent() {
  const { token } = useContext(UserContext);
  return (
    <main>
      <Title />
      {token ? (
        <PlayerFormProvider>
          <DashboardTabs />
        </PlayerFormProvider>
      ) : (
        <AccessTabs />
      )}
    </main>
  );
}

export default MainContent;
