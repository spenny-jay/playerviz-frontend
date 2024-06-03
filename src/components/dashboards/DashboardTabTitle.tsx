import { CloseButton } from "react-bootstrap";
import { Floppy } from "react-bootstrap-icons";

import classes from "./DashboardTabTitle.module.css";
import { Dispatch } from "react";

type Props = {
  dashboardName: string;
  dashboardId: string;
  tabDispatch: Dispatch<any>;
  saveDashboard: (dashboardId: string, dashboardName: string) => void;
  isActive: boolean;
};

function DashboardTabTitle({
  dashboardName,
  dashboardId,
  tabDispatch,
  saveDashboard,
  isActive,
}: Props) {
  return (
    <>
      <input
        className={classes["title-input"]}
        type="text"
        value={dashboardName}
        onChange={(e) =>
          tabDispatch({
            type: "UPDATE",
            dashboardName: e.target.value,
            dashboardId: dashboardId,
          })
        }
      />
      <CloseButton
        onClick={() =>
          tabDispatch({ type: "DELETE", dashboardId: dashboardId })
        }
      />
      {isActive && (
        <Floppy
          onClick={() => saveDashboard(dashboardId, dashboardName)}
          className={classes["floppy-icon"]}
        />
      )}
    </>
  );
}

export default DashboardTabTitle;
