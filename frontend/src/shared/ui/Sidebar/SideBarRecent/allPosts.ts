import { createEffect, createEvent, createStore } from "effector";
import { api } from "../../../api";

interface IPost {
  name: string;
  id: number;
}

export const getAllPostsFx = createEffect(async () => {
  const data: IPost[] = await api.get("/post/all");
  return data;
});

export const $allPosts = createStore<IPost[]>([]).on(
  getAllPostsFx.doneData,
  (_, posts) => posts
);

export const update = createEvent<IPost[]>();

const updatePosts = (_: IPost[], data: IPost[]) => [...data];

$allPosts.on(update, updatePosts);
