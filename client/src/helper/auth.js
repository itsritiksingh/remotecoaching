import axios from "axios";

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signup = (data) => {
  console.log(data)
  return axios
    .post(`/user`, { ...data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const signin = (data) => {
  return axios
    .post(`/login`, data)
    .then((res) => {
      authenticate(res.data);
      //redirect to /
      window.location.href = window.location.origin;
    })
    .catch((err) => {
      if (err.request) {
        throw new Error(err.request);
      } else if (err.response) {
        throw  new Error(err.response);
      } else {
        throw new Error(err);
      }
    });
};
