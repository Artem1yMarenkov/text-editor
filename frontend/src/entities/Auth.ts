import { createEvent, createStore } from "effector";

export const setIsLogin = createEvent<boolean>();
export const $isLogin = createStore<boolean>(false).on(
	setIsLogin,
	(_, payload) => payload
);