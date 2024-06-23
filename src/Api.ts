import { AuthRequest } from "./models/AuthRequest";
import { AuthResponse } from "./models/AuthResponse";
import { DashboardNameModel } from "./models/DashboardNameModel";
import { DashboardResponse } from "./models/DashboardResponse";
import { NameModel } from "./models/NameModel";
import { PlayerModel } from "./models/PlayerModel";
import { DashboardRequest } from "./models/DashboardRequest";
import { DashboardIdResponse } from "./models/DashboardIdResponse";

/// DASHBOARDS

/**
 * Creates a new dashboard
 * @param createdDashboard Dashboard metadata
 * @returns dashboard id of newly created dashboard
 */
export async function createDashboardApi(
  createdDashboard: DashboardRequest
): Promise<string> {
  try {
    const savedDashboardId = await postAsync<string, DashboardRequest>(
      `api/dashboards/`,
      createdDashboard
    );
    return savedDashboardId;
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Saves an existing dashboard
 * @param dashboard: dashboard metadata
 * @param dashboardId
 * @returns dashboard id
 */
export async function saveDashboardApi(
  dashboard: DashboardRequest,
  dashboardId: string
): Promise<string> {
  try {
    const savedDashboardId = await postAsync<string, DashboardRequest>(
      `api/dashboards/${dashboardId}`,
      dashboard
    );
    return savedDashboardId;
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Gets a given dashboard by its dashboard id
 * @param dashboardId
 * @returns dashboard data to render on screen
 */
export async function getDashboardApi(
  dashboardId: string
): Promise<DashboardResponse> {
  try {
    const dashboard = await getAsync<DashboardResponse>(
      `api/dashboards/dashboard/${dashboardId}`
    );
    return dashboard;
  } catch (e) {
    console.log("Failed to retrieve dashboard: " + dashboardId);
    return null;
  }
}

/**
 * Deletes a given dashboard by its dashboard id
 * @param dashboardId
 * @returns dashboard data to render on screen
 */
export async function deleteDashboardApi(dashboardId: string): Promise<string> {
  try {
    const resDashboardId = await deleteAsync<DashboardIdResponse>(
      `api/dashboards/${dashboardId}`
    );
    return resDashboardId.dashboardId;
  } catch (e) {
    console.log("Failed to delete dashboard: " + dashboardId);
    return null;
  }
}

/**
 * Gets the names and ids of all the dashboards for the current user
 * @returns List of dashboard name and id pairs
 */
export async function getUserDashboardApi(): Promise<DashboardNameModel[]> {
  try {
    const dashboard = await getAsync<DashboardResponse>(`api/dashboards/`);
    return dashboard["dashboardNames"];
  } catch (e) {
    console.log("Failed to retrieve user's dashboards", e);
    return null;
  }
}

// PLAYERS
/**
 * Gets a player by id
 * @param playerId
 * @returns Player metadata
 */
export async function getPlayerApi(playerId: string): Promise<PlayerModel> {
  try {
    const player = await getAsync<PlayerModel>(
      `api/players/player/${playerId}`
    );
    console.log(player);
    return player;
  } catch (e) {
    console.log(`Failed to retrieve player with id: ${playerId}`);
    return null;
  }
}

/**
 * When searching for a player, this method will return the player names + ids
 * that match the given query
 * @param query User's text in search bar
 * @returns player name + id pairs that match the query
 */
export async function getPlayerNamesApi(query: string): Promise<NameModel[]> {
  try {
    const player = await getAsync<PlayerModel[]>(`api/players/${query}`);
    return player;
  } catch (e) {
    console.log(`Failed to retrieve player(s) with name substring: ${query}`);
    return null;
  }
}

// USERS
export async function loginApi(authReq: AuthRequest): Promise<AuthResponse> {
  try {
    const player = await postAsync<AuthResponse, AuthRequest>(
      `api/users/login`,
      authReq
    );
    return player;
  } catch (e) {
    console.log(`Failed to login user: ${authReq.username}`);
    return null;
  }
}

export async function signUpApi(authReq: AuthRequest): Promise<AuthResponse> {
  try {
    const player = await postAsync<AuthResponse, AuthRequest>(
      `api/users/signup`,
      authReq
    );
    return player;
  } catch (e) {
    console.log(`Failed to login user: ${authReq.username}`);
    return null;
  }
}

export async function refreshApi(): Promise<string> {
  try {
    const refreshTokenRes = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/api/users/refresh`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("refreshToken"),
        },
      }
    );
    const resJson = await refreshTokenRes.json();
    const token: string = resJson.token;
    if (token) {
      localStorage.setItem("token", token);
      return token;
    }
  } catch (e) {
    console.log(e);
  }
  return "";
}

// GENERIC REQUESTS
async function getAsync<Type>(endpoint: string): Promise<Type> {
  try {
    const res = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/${endpoint}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data: Type = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function postAsync<T, U>(endpoint: string, body: U): Promise<T> {
  try {
    const res = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/${endpoint}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      }
    );
    const data: T = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteAsync<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(
      `http://${process.env.REACT_APP_BACKEND_API}/${endpoint}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data: T = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
