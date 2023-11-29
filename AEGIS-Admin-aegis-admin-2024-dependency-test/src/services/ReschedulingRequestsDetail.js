import { get, put } from "../config/api"

export const ReschedulingRequestsDetail = {
  index: () => get("/api/rescheduling-requests/", ).then((resp) => resp.data),
  // {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  getRequest: (id) => get(`/api/rescheduling-requests/${id}/`).then((resp) => resp.data),
  updateRequest: (id, {...params}) => put(`/api/rescheduling-requests/${id}/`, params).then((resp) => resp.data),
}
