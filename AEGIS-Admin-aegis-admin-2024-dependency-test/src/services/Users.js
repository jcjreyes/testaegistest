import { get } from "../config/api";

export const Users = {
  index: (
    page = null,
    limit = null,
    hasWriteup = null,
    sortBy = null,
    searchInput = null
  ) =>
    get("/api/users/", {
      params: {
        page: page,
        limit: limit,
        hasWriteup: hasWriteup,
        sortBy: sortBy,
        searchInput: searchInput,
      },
    }).then((resp) => resp.data),
  // {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
  single: (id) => get(`/api/users/${id}/`).then((resp) => resp.data),
  writeupCount: (searchInput = null) =>
    get("/api/writeup-user-count/", {
      params: { searchInput: searchInput },
    }).then((resp) => resp.data),
};
