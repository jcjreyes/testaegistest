import { get } from "../config/api"

export const Users = {
  index: () => get("/api/users/", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then((resp) => resp.data),
  single: (id) => get(`/api/users/${id}/`).then((resp) => resp.data),
}
