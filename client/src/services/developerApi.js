import api from "./api.js";

export const listSchools = () => api.get("/developer/schools").then((r) => r.data.data);
export const createSchool = (body) => api.post("/developer/schools", body).then((r) => r.data.data);
export const updateSchool = (id, body) => api.patch(`/developer/schools/${id}`, body).then((r) => r.data.data);
export const deleteSchool = (id, confirmation) =>
  api.delete(`/developer/schools/${id}`, { data: { confirmation } }).then((r) => r.data);
export const listAdmins = (schoolId) =>
  api.get(schoolId ? `/developer/schools/${schoolId}/admins` : "/developer/admins").then((r) => r.data.data);
export const createSchoolAdmin = (schoolId, body) =>
  api.post(`/developer/schools/${schoolId}/admins`, body).then((r) => r.data.data);
export const updateAdmin = (id, body) => api.patch(`/developer/admins/${id}`, body).then((r) => r.data.data);
export const deleteAdmin = (id) => api.delete(`/developer/admins/${id}`).then((r) => r.data);