import { createEffect } from "effector";
import { ILoginFormState, ILoginData } from "../../entities/User/types";
import { api } from "../../shared/api";
import { setIsLogin } from "../../app/auth";
import { AxiosResponse } from "axios";

export const loginUserFx = createEffect(async (formData: ILoginFormState) => {
  const { data }: AxiosResponse<ILoginData> = await api.post("/user/login", formData);
  return data;
});

loginUserFx.doneData.watch(({ data }) => {
  localStorage.setItem("token", data.token);
  setIsLogin(true);
});