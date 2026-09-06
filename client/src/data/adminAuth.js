import api, { setAdminToken } from "../services/api.js";

let currentAdminRequest = null;
export const dashboardFor = (user) =>
  user?.role === "developer" ? "/developer/dashboard" : "/admin/dashboard";

export async function loginAdmin(username, password) {
  try {
    const response = await api.post("/auth/login", { username, password }, { skipAuthRedirect: true });
    setAdminToken(response.data.data.token || "");
    return { success: true, data: response.data.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed.",
    };
  }
}

export async function logoutAdmin() {
  try {
    await api.post("/auth/logout", null, { skipAuthRedirect: true });
  } catch {
    // Logout should still clear in-memory state.
  } finally {
    currentAdminRequest = null;
    setAdminToken("");
  }
}

export async function getCurrentAdmin() {
  currentAdminRequest ||= api
    .get("/auth/me", { skipAuthRedirect: true })
    .then((response) => response.data.data)
    .finally(() => {
      currentAdminRequest = null;
    });
  return currentAdminRequest;
}

export async function isAdminAuthed() {
  try {
    await getCurrentAdmin();
    return true;
  } catch {
    return false;
  }
}