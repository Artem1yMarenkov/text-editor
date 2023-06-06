import { createDomain } from "effector";
import { AxiosResponse } from "axios";
import { IRegisterFormState, ILoginFormState } from "./types";
import { api } from "../../shared/api";

export const userDomain = createDomain();

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
