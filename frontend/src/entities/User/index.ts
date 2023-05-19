import { createEffect } from "effector";
import { IRegisterFormState, ILoginFormState } from "./types";
import { api } from "../../shared/api";

export const registerUserFx = createEffect(async (formData: IRegisterFormState) => {
	const response = await api.post("/user/register", formData);
	return response;
});

export const loginUserFx = createEffect(async (formData: ILoginFormState) => {
    const response = await api.post("/user/login", formData);
    return response;
});

export const logoutUserFx = createEffect(() => {
	localStorage.removeItem("token");
})