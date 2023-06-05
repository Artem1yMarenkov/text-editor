import { createEvent, createStore } from "effector";

interface IPostContent {
  uuid: string;
  header: string;
  content: string | null;
}

export const changeContent = createEvent<IPostContent>();
export const clearPost = createEvent();

export const $post = createStore<IPostContent | null>({} as IPostContent)
  .on(changeContent, (_, payload) => payload)
  .on(clearPost, () => null);
