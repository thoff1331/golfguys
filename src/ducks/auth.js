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
const ME = "ME";
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
      console.log(action.payload.data);
      return {
        ...state,
        username: action.payload.data.username,
        pp: action.payload.data.pp
      };
    case `${LOGOUT}_FULFILLED`:
      console.log(action.payload.data);
      return {};

    default:
      return state;
  }
}
