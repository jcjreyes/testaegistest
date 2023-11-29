import { get, post, put, patch } from "../config/api"

export const Photoshoots = {
  getPhotoshootPeriodSettings: () => get("api/photoshoot-periods-settings").then((resp) => resp.data),
  getPhotoshootPeriods: () => get("/api/photoshoot-periods").then((resp) => resp.data),
  getPhotoshootDates: () => get("/api/photoshoot-dates").then((resp) => resp.data),
  getPhotoshootDatetimes: () => get("/api/photoshoot-times").then((resp) => resp.data),
  getPhotoshootDatetimesWithId: (id) => get("/api/photoshoot-times/", { params: { date: id } }).then((resp) => resp.data),
  getEnlistmentDates: () => get("/api/enlistment-dates").then((resp) => resp.data),
  getPhotoshoots: () => get("/api/photoshoot").then((resp) => resp.data),
  updatePhotoshoot: (id, { ...params }) => put(`/api/photoshoot/${id}/`, params),
  updatePhotoshootStatus: (id, { ...params }) => patch(`/api/photoshoot/${id}/`, params),
  getSinglePeriod: (id) => get(`/api/photoshoot-periods/${id}/`).then((resp) => resp.data),
  updatePhotoshootPeriod: (id, { ...params }) => put(`/api/photoshoot-periods/${id}/`, params),
  postPhotoshootPeriods: ({ ...params }) => post("/api/photoshoot-periods/", params),
  postEnlistmentDates: ({ ...params }) => post("/api/enlistment-dates/", params),
//   createAccount: ({ ...params }) => post("/auth/registration/", params),
//   login: ({ ...params }) => post("/auth/login/", params),
//   me: () => get("/api/me").then((resp) => resp.data),
//   singleUser: (id) => get(`/api/users/${id}`).then((resp) => resp.data),
//   logout: () => post("/auth/logout/"),
//   changeUser: ({ ...params }) => put(`/api/users/${params.id}/`, params),
//   changePassword: ({ oldPassword, newPassword, newPasswordConfirm } = {}) =>
//     post("/auth/password/change/", {
//       old_password: oldPassword,
//       new_password1: newPassword,
//       new_password2: newPasswordConfirm,
//     }),
//   verifyEmail: ({ key }) =>
//     post("/auth/verify-email/", {
//       key,
//     }),
//   requestPasswordChange: ({ email }) =>
//     post("/auth/password/reset/", {
//       email,
//     }),
//   changeForgotPassword: ({ ...params }) =>
//     post("/auth/password/reset/confirm/", {
//       new_password1: params.newPassword1,
//       new_password2: params.newPassword2,
//       uid: params.uid,
//       token: params.token,
//     }),
//   checkIfPasswordIsTooCommon: ({ ...params }) => post('/auth/pw-common-check/', {
//     pw: params.pw
//   })
}