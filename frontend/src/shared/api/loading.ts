import { createEvent, createStore } from "effector";

export const setLoading = createEvent<boolean>();
export const $loading = createStore<boolean>(false).on(setLoading, 
	(_, payload) => payload
);