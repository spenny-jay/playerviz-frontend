import { Floppy, XLg } from "react-bootstrap-icons";

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
      <div className={classes["button-wrapper"]}>
        {isActive && (
          <Floppy
            onClick={() => saveDashboard(dashboardId, dashboardName)}
            className={classes["floppy-icon"]}
          />
        )}
        <XLg
          className={classes["x-icon"]}
          onClick={() =>
            tabDispatch({ type: "DELETE", dashboardId: dashboardId })
          }
        />
      </div>
    </>
  );
}

export default DashboardTabTitle;
