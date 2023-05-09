import { Heading, Textarea } from "@chakra-ui/react";
import { $content, $header, changeContent, changeHeader } from "./post";
import { useStore } from "effector-react";
import { ChangeEvent } from "react";

export const PostEditorWidget = () => {
	const header = useStore($header);
	const content = useStore($content);


	return (
		<>
			<Heading 
				contentEditable
				onInput={
					({ target }: ChangeEvent<HTMLHeadingElement>) => changeHeader(target.innerHTML)
				}
			>
				{header}
			</Heading>
			<Textarea 
				placeholder="Some content..."
				variant="unstyled"
				onChange={({ target }) => changeContent(target.value)}
				value={content ?? ""}
				sx={{ fontSize: "16px", mb: "20px", resize: "none"}}
				resize="none"
			/>
		</>
	);
};