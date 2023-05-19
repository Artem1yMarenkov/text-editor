import { useList } from "effector-react";
import { $notifications } from "../../entities/Notifications";
import { Alert, AlertDescription, AlertTitle, Box, CloseButton, Flex, useDisclosure } from "@chakra-ui/react";


const AlertSx = {
	borderRadius: 10,
	boxShadow: "0 0 20px #d8d8d8",
};

export const Notifications = () => {
	const notifications = useList($notifications, ({ header, message, id, status }) => (
		<Alert
			variant=""
			flexDirection="row"
			justifyContent="space-between"
			alignItems="flex-start"
			sx={AlertSx}
        >
			<Box>
				<AlertTitle> { header } </AlertTitle>
				<AlertDescription> { message } </AlertDescription>
			</Box>
			<CloseButton />
		</Alert>
	));

	return (
		<Flex
			flexDirection="column"
			position="fixed"
			bottom="20px"
			right="20px"
			width="30vw"
			gap="10px"
		>
			{ notifications }
		</Flex>
	);
};