import { createEvent, createStore } from "effector";
import { IPostContent } from "./types";

export const changeContent = createEvent<IPostContent>();
export const clearPost = createEvent();

export const $post = createStore<IPostContent | null>({} as IPostContent)
  .on(changeContent, (_, payload) => payload)
  .on(clearPost, () => null);
