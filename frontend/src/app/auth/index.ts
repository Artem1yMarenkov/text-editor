import { createDomain, sample } from "effector";
import { loginUserFx, logoutUserFx } from "../../entities/User";

const tokenExists = !!localStorage.getItem("token");
export const authDomain = createDomain();

export const loginFx = authDomain.createEffect((token: string | null) => {
  if (token !== null) {
    localStorage.setItem("token", token);
    return true;
  }

  return false;
});

export const logoutFx = authDomain.createEffect(() => {
  localStorage.removeItem("token");
  return false;
});

export const $isLogin = authDomain
  .createStore<boolean>(tokenExists)
  .on([loginFx.done, logoutFx.done], (_, { result }) => result);

sample({
  clock: loginUserFx.done,
  fn: ({ result }) => result.data.data.token || null,
  target: loginFx,
});

sample({
  clock: logoutUserFx.done,
  target: logoutFx,
});
