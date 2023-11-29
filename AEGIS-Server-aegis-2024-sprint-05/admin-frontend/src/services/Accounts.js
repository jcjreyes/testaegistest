import { get, post, put } from "../config/api"

export const Accounts = {
  getCourseCodeList: () => get("/api/course-list").then((resp) => resp.data),
  getYearList: () => get("/api/year-list").then((resp) => resp.data),
  getSchoolList: () => get("/api/school-list").then((resp) => resp.data),
  createAccount: ({ ...params }) => post("/auth/registration/", params),
  login: ({ ...params }) => post("/auth/login/", params),
  me: () => get("/api/me").then((resp) => resp.data),
  singleUser: (id) => get(`/api/users/${id}`).then((resp) => resp.data),
  logout: () => post("/auth/logout/"),
  changeUser: ({ ...params }) => put(`/api/users/${params.id}/`, params),
  changePassword: ({ oldPassword, newPassword, newPasswordConfirm } = {}) =>
    post("/auth/password/change/", {
      old_password: oldPassword,
      new_password1: newPassword,
      new_password2: newPasswordConfirm,
    }),
  verifyEmail: ({ key }) =>
    post("/auth/verify-email/", {
      key,
    }),
  requestPasswordChange: ({ email }) =>
    post("/auth/password/reset/", {
      email,
    }),
  changeForgotPassword: ({ ...params }) =>
    post("/auth/password/reset/confirm/", {
      new_password1: params.newPassword1,
      new_password2: params.newPassword2,
      uid: params.uid,
      token: params.token,
    }),
  checkIfPasswordIsTooCommon: ({ ...params }) => post('/auth/pw-common-check/', {
    pw: params.pw
  })
}