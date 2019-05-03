import axios from "axios";
import { stat } from "fs";
const initialState = {
  pp: "",
  username: "",
  error: "",
  logout: false
};
//Action types

const SIGN_UP = "SIGN_UP";
const LOGIN = "LOGIN";
const GET_SESSION = "GET_SESSION";
const LOGOUT = "LOGOUT";

// Action creator

export function signUp(pp, username, password) {
  return {
    type: SIGN_UP,
    payload: axios.post("/auth/signup", { pp, username, password })
  };
}
export function login(username, password) {
  return {
    type: LOGIN,
    payload: axios.post("/auth/login", { username, password })
  };
}
export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios.get("/auth/cookie")
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.get("/auth/logout")
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SIGN_UP}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data[0].username,
        pp: action.payload.data.pp
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username,
        pp: action.payload.data.pp
      };
    case `${SIGN_UP}_REJECTED`:
      return {
        ...state,
        error: "Username already taken"
      };
    case `${GET_SESSION}_FULFILLED`:
      return {
        ...state,
        username: action.payload.data.username,
        pp: action.payload.data.pp
      };
    case `${LOGOUT}_PENDING`:
      return {
        pp: "",
        username: ""
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        pp: "",
        username: ""
      };
    case `${LOGOUT}_REJECTED`:
      return {
        pp: "",
        username: ""
      };

    default:
      return state;
  }
}
