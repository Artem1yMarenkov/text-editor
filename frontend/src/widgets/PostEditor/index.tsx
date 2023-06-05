import { ChangeEvent, KeyboardEvent, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useStore } from "effector-react";
import { Button, Grid, GridItem, Input, Textarea } from "@chakra-ui/react";
import { $post, changeContent } from "./post";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export const PostEditorWidget = () => {
	const [contentAreaHeight, setContentAreaHeight] = useState(0);
	const [show, setShow] = useState(false);
	const post = useStore($post);
  const handleshowChange = (): void => setShow(!show);
	
	const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (post) {
			changeContent({
				...post,
				header: event.target.value
			});
		}
	};

	const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (post) {
			changeContent({
				...post, 
				content: event.target.value 
			});
		}
	};

	const resizeTextarea = ({ target }: KeyboardEvent<HTMLTextAreaElement>) => {
		const element = target as HTMLTextAreaElement;
		setContentAreaHeight(element.scrollHeight);
	};

	return (
		<>
			<Button variant="unstyled" size="sm" sx={{ mb: "20px"}}>← Назад</Button>
			<Input
				onChange={handleHeaderChange}
				value={post?.header}
				sx={{ fontSize: "32px", mb: "16px", fontWeight: "500" }}
				variant="unstyled"
				placeholder="Header here..."
				defaultValue="Untitled"
			/>
			<Grid templateColumns="1fr 1fr 20px" gap="20px">
				<GridItem>
					<Textarea 
						onChange={handleContentChange}
						onKeyUp={resizeTextarea}
						value={post?.content || ""}
						placeholder="Content here..."
						minHeight="90vh"
						variant="unstyled"
						resize="none"
						overflow="hidden"
						height={contentAreaHeight}
					/>
				</GridItem>
				{show 
				?			
					<GridItem>
						<MDEditor.Markdown source={String(post?.content || "")} />
					</GridItem>
				:
				<div></div>
				}
				<IconButton
              icon={show ? <ViewIcon /> : <ViewOffIcon />}
              onClick={handleshowChange}
              aria-label={"Search database"}
        ></IconButton>
			</Grid>
		</>
	);
};