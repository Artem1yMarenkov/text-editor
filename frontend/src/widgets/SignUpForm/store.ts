import { createEffect, createEvent, createStore, restore } from "effector";
import { IFormState } from "./types";
import { api } from "../../shared/api";

export const setRegisterUserPending = createEvent<boolean>();
export const $registerUserPending = restore(setRegisterUserPending, false);

export const registerUserFx = createEffect(async (formData: IFormState) => {
	setRegisterUserPending(true);
	const response = await api.post("/user/register", formData);
	return response.status;
});

registerUserFx.finally.watch(() => {
	setRegisterUserPending(false);
});


export const setRegisterUserResponseState = createEvent<number | null>();
export const $registerUserResponseState = restore(setRegisterUserResponseState, null)
	.on(registerUserFx.doneData, (_, status) => status);

