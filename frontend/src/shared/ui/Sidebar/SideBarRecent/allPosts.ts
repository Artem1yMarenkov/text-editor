import { createEffect, createEvent, createStore } from "effector";
import { api } from "../../../api";

interface IPost {
  name: string;
  id: number;
}

export const getAllPostsFx = createEffect(async () => {
  await api.get("/post/all");
});

export const $allPosts = createStore<IPost[]>([
  {
    name: "43242",
    id: 123312,
  },
  {
    name: "43321242",
    id: 123312,
  },
  {
    name: "43243213212",
    id: 123312,
  },
]);

export const update = createEvent<IPost[]>();

const updatePosts = (_: IPost[], data: IPost[]) => [...data];

$allPosts.on(update, updatePosts);
