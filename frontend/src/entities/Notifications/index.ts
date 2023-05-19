import { createEvent, createStore } from "effector";
import { INotification } from "./types";

const testNotice: INotification = { message: "Денчик не подглядывай", status: "success", id: 1, header: "Внимание!" };

const testNotifications: INotification[] = [
	testNotice, testNotice, testNotice,
];

export const pushNotification = createEvent<INotification>();
export const deleteNotification = createEvent<number>();

export const $notifications = createStore<INotification[]>(testNotifications)

$notifications.on(pushNotification, (state, payload) => [...state, payload]);
$notifications.on(deleteNotification, (state, notificationId) => {
	return state.filter(notification => notification.id !== notificationId);
});