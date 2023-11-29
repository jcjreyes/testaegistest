import { get, put, post } from "../config/api"

export const Writeups = {
  getAllWriteups: () => get("/api/writeups/").then((resp) => resp.data),
  exportAllWriteups: () => get("/api/export-writeups").then((resp) => resp.data),
  getWriteup: (id) => get(`/api/writeups/${id}/`).then((resp) => resp.data),
  updateWriteup: ({ ...params }) => put(`/api/writeup/${params.id}/`, params),
  getWriteupComments: () => get(`/api/writeup-comments/`).then((resp) => resp.data),
  getSpecificWriteupComments: (writeup) => get(`/api/writeup-comments/?writeup=${writeup}`).then((resp) => resp.data),
  postComment: ({...params}) => post(`/api/writeup-comments/`, params).then((resp) => resp.data),
}
