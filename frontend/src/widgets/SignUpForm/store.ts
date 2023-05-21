import { createEvent, restore, sample } from "effector";
import { registerUserFx } from "../../entities/User";

export const setRegisterStatus = createEvent<number | null>();
export const $registerStatus = restore(setRegisterStatus, null);

sample({
	clock: registerUserFx.done,
	fn: ({ result }) => result.status || null,
	target: $registerStatus
});

// TODO: remove setTimeout
$registerStatus.watch((state) => {
	setTimeout(() => {
		if (state !== null) {
			setRegisterStatus(null);
		}
	});
<<<<<<< HEAD
})
=======
})
>>>>>>> 84c617c (refactor: change auth structure)
