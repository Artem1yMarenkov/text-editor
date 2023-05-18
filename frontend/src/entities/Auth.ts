import { createEvent, createStore } from "effector";

const tokenExists = localStorage.getItem("token") ? true : false;

export const setIsLogin = createEvent<boolean>();
export const $isLogin = createStore<boolean>(tokenExists).on(
  setIsLogin,
  (_, payload) => payload
);
