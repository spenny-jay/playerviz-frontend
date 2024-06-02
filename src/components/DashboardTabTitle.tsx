import { CloseButton } from "react-bootstrap";
import { Floppy } from "react-bootstrap-icons";

import classes from "./DashboardTabTitle.module.css";

type Props = {
  title: string;
  dashboardId: string;
  updateTitle: (dashboardId: string, title: string) => void;
  deleteDashboard: (dashboardId: string) => void;
  saveDashboard: (dashboardId: string, title: string) => void;
  isActive: boolean;
};

function DashboardTabTitle({
  title,
  dashboardId,
  updateTitle,
  deleteDashboard,
  saveDashboard,
  isActive,
}: Props) {
  return (
    <>
      <input
        className={classes["title-input"]}
        type="text"
        value={title}
        onChange={(e) => updateTitle(dashboardId, e.target.value)}
      />
      <CloseButton onClick={() => deleteDashboard(dashboardId)} />
      {isActive && (
        <Floppy
          onClick={() => saveDashboard(dashboardId, title)}
          className={classes["floppy-icon"]}
        />
      )}
    </>
  );
}

export default DashboardTabTitle;
