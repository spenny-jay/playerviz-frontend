import { Floppy, Trash, XLg } from "react-bootstrap-icons";

import classes from "./DashboardTabTitle.module.css";
import { Dispatch } from "react";
import { deleteDashboardApi } from "../../Api";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const IconTooltip = (text: string) => <Tooltip>{text}</Tooltip>;

type Props = {
  dashboardName: string;
  dashboardId: string;
  tabDispatch: Dispatch<any>;
  saveDashboard: (dashboardId: string, dashboardName: string) => void;
  isActive: boolean;
};

/**
 * Represents the header for a single dashboard tab. Contains interactable
 * elements to close, save, and rename the dashboard
 */
function DashboardTabTitle({
  dashboardName,
  dashboardId,
  tabDispatch,
  saveDashboard,
  isActive,
}: Props) {
  const deleteDashboard = async (dashboardId: string): Promise<void> => {
    const deletedDashboardId: string = await deleteDashboardApi(dashboardId);
    if (deletedDashboardId) {
      tabDispatch({ type: "CLOSE", dashboardId: dashboardId });
      console.log(`Successfully deleted dashboard: ${deletedDashboardId}`);
    }
  };

  return (
    <>
      <OverlayTrigger overlay={IconTooltip("Update Title")}>
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
      </OverlayTrigger>

      <div className={classes["button-wrapper"]}>
        {isActive && (
          <>
            <OverlayTrigger overlay={IconTooltip("Save Dashboard")}>
              <Floppy
                onClick={() => saveDashboard(dashboardId, dashboardName)}
                className={classes["floppy-icon"]}
              />
            </OverlayTrigger>

            <OverlayTrigger overlay={IconTooltip("Delete Dashboard")}>
              <Trash
                className={classes["trash-icon"]}
                onClick={() => deleteDashboard(dashboardId)}
              />
            </OverlayTrigger>
          </>
        )}
        <OverlayTrigger overlay={IconTooltip("Close Dashboard")}>
          <XLg
            className={classes["close-icon"]}
            onClick={() => {
              saveDashboard(dashboardId, dashboardName);
              tabDispatch({ type: "CLOSE", dashboardId: dashboardId });
            }}
          />
        </OverlayTrigger>
      </div>
    </>
  );
}

export default DashboardTabTitle;
