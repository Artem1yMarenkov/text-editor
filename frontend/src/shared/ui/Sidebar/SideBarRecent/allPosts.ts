import { createEffect, createEvent, createStore } from "effector";
import { IPostContent, IPostFetchData } from "./types";
import { api } from "../../../api";

export const fetchPostsFx = createEffect(async () => {
  const { data }: IPostFetchData = await api.get("/post/all");
  return data.data;
});

export const savePostChangesFx = createEffect(async (post: IPostContent) => {
  const data = await api
    .post(`/post/update/${post._id}`, {
      data: { title: post.title, content: post.content },
    })
    .then(() => fetchPostsFx());
  return data;
});

export const createPostFx = createEffect(async () => {
  const response = api
    .post("/post/create", {
      postData: {
        title: "New Post",
        content: `created at ${Date()}`,
      },
    })
    .then(() => fetchPostsFx());

  return response;
});

export const deletePostFx = createEffect(async (postId: string) => {
  const response = api.delete(`/post/${postId}`).then(() => fetchPostsFx());
  return response;
});

export const $postList = createStore<IPostContent[]>([] as IPostContent[]).on(
  fetchPostsFx.doneData,
  (_, result) => result
);

export const update = createEvent<IPostContent[]>();

const updatePosts = (_: IPostContent[], data: IPostContent[]) => [...data];

$postList.on(update, updatePosts);
