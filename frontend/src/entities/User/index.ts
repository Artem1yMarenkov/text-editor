import { createDomain, sample } from "effector";
import { AxiosError, AxiosResponse } from "axios";
import { IRegisterFormState, ILoginFormState, IUser } from "./types";
import { api } from "../../shared/api";
import { IServerResponse } from "../../shared/types";

export const userDomain = createDomain();

export const $userInfo = userDomain.createStore<IUser | null>(null);

export const getUserInfoFx = userDomain.createEffect<
  void,
  AxiosResponse<IServerResponse<IUser>>,
  AxiosError
>(async () => {
  const response = await api.get("/user/info");
  return response;
});

$userInfo.on(getUserInfoFx.doneData, (_, payload) => payload.data.data);

export const updateUserInfoFx = userDomain.createEffect<
  Partial<IUser>,
  AxiosResponse<IServerResponse<IUser>>,
  AxiosError
>(async (userInfo) => {
  const response = await api.post("/user/update", { ...userInfo });
  return response;
});

sample({
  clock: updateUserInfoFx.doneData,
  target: getUserInfoFx,
});

export const registerUserFx = userDomain.createEffect(
  async (formData: IRegisterFormState) => {
    const response = await api.post("/user/register", formData);
    return response;
  }
);

export const loginUserFx = userDomain.createEffect(
  async (formData: ILoginFormState) => {
    const response: AxiosResponse<{ data: { token: string } }> = await api.post(
      "/user/login",
      formData
    );
    return response;
  }
);

export const logoutUserFx = userDomain.createEffect(() => true);
