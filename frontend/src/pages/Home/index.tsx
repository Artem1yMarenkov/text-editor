import { Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "../../shared/ui/Sidebar";
import { PostEditorWidget } from "../../widgets/PostEditor";

export const HomePage = () => {
	return (
		<Grid templateColumns="1fr 5fr" gap="20px">
			<GridItem>
				<Sidebar />
			</GridItem>
			<GridItem padding="20px">
				<PostEditorWidget />
			</GridItem>
		</Grid>
	);
};