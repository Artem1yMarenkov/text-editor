import { createEffect, createEvent, restore } from "effector";
import { IFormState, ILoginData } from "./types";
import { api } from "../../shared/api";
import { setIsLogin } from "../../entities/Auth";

export const setUserLoginPending = createEvent<boolean>();
export const $userLoginPending = restore(setUserLoginPending, false);

export const fetchUserLoginFx = createEffect(async (formData: IFormState) => {
  setUserLoginPending(true);
  const { data }: ILoginData = await api.post("/user/login", formData);
  return data;
});

fetchUserLoginFx.doneData.watch(({ data }) => {
  localStorage.setItem("token", data.token);
  setIsLogin(true);
});

fetchUserLoginFx.finally.watch(() => setUserLoginPending(false));

export const setUserLoginResponseStatus = createEvent<number>();
export const $userLoginResponseStatus = restore(
  setUserLoginResponseStatus,
  null
).on(fetchUserLoginFx.doneData, (_, data) => data.statusCode);
