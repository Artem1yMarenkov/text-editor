import { Button, Flex, Text } from "@chakra-ui/react";

export const Sidebar = () => {
	return (
		<Flex 
			gap="10px" 
			flexDirection="column" 
			padding="10px 20px" 
			sx={{ background: "#fffcfc", height: "100vh" }}
		>
			<Text>Text Editor</Text>
			<Button variant="sidebar">&#62; Settings</Button>
		</Flex>
	);
}