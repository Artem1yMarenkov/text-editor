import { createEffect } from "effector";
import { setUserLoginResponseStatus } from "../widgets/SIgnInForm/store";
import { setIsLogin } from "../entities/Auth";

export const userLogoutFx = createEffect(() => {
  localStorage.removeItem("token");
  setIsLogin(false);
  setUserLoginResponseStatus(401);
});
