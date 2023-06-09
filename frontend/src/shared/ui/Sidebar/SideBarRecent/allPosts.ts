import { createEffect, createEvent, createStore } from "effector";
import { api } from "../../../api";

interface IPost {
  name: string;
  id: number;
}

export const getAllPostsFx = createEffect(async () => {
  await api.post("/post/all");
});

export const $allPosts = createStore<IPost[]>([]);

export const update = createEvent<IPost[]>();

const updatePosts = (data: IPost[]) => [...data];

$allPosts.on(update, updatePosts);
