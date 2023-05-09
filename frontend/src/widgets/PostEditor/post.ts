import { createEvent, createStore } from "effector";

export const $header = createStore<string | null>("that's header...")
export const $content = createStore<string | null>("");

export const changeHeader = createEvent<string>();
export const changeContent = createEvent<string>();

$header.on(changeHeader, (_, payload) => {
	console.log(payload);
	return payload;
});

$content.on(changeContent, (_, payload) => payload);