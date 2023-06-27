import { createEvent, createStore } from "effector";
import { IPostContent } from "./types";

export const changeContent = createEvent<IPostContent>();
export const clearPost = createEvent();

export const $post = createStore<IPostContent>({} as IPostContent)
  .on(changeContent, (_, payload) => payload)
  .on(clearPost, () => {});
