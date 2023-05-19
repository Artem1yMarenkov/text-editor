import { createEvent, restore } from "effector";

const tokenExists = localStorage.getItem("token") ? true : false;

export const setIsLogin = createEvent<boolean>();
export const $isLogin = restore(setIsLogin, tokenExists);