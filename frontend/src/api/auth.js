import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`${base}/login`, data);
  };

  static Register = (data) => {
    return axios.post(`${base}/signup`, data);
  };

  static Validation = (data) => {
    return axios.patch(`${base}/activate`, data);
  };

  static Logout = (data) => {
    console.log(data)
    return axios.get(`${base}/logout`, { headers: { Authorization: `Bearer ${data.token}` } });
  };
}

let base = "users";

export default AuthApi;
