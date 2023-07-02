import { ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useStore } from "effector-react";
import {
  Button,
  Grid,
  GridItem,
  Input,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { $post, changeContent } from "./post";
import { savePostChangesFx } from "../../shared/ui/Sidebar/SideBarRecent/allPosts";
import { IPostContent } from "./types";

function debounce() {
  let timer: null | ReturnType<typeof setTimeout> = null;

  return (args: IPostContent) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      savePostChangesFx(args);
    }, 2000);
  };
}

const savePostChanges = debounce();

export const PostEditorWidget = () => {
  const [contentAreaHeight, setContentAreaHeight] = useState(0);
  const [show, setShow] = useState(false);
  const post = useStore($post);
  const handleshowChange = (): void => setShow(!show);

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (post) {
      changeContent({
        ...post,
        title: event.target.value,
      });
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (post) {
      changeContent({
        ...post,
        content: event.target.value,
      });
    }
  };

  useEffect(() => {
    savePostChanges(post);
  }, [post]);

  const resizeTextarea = ({ target }: KeyboardEvent<HTMLTextAreaElement>) => {
    const element = target as HTMLTextAreaElement;
    setContentAreaHeight(element.scrollHeight);
  };

  return (
    <>
      <Button variant="unstyled" size="sm" sx={{ mb: "20px" }}>
        ← Назад
      </Button>
      <Input
        onChange={handleHeaderChange}
        value={post?.title}
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
            minHeight="84.5vh"
            variant="unstyled"
            resize="none"
            overflow="hidden"
            height={contentAreaHeight}
          />
        </GridItem>
        {show ? (
          <GridItem>
            <MDEditor.Markdown source={String(post?.content || "")} />
          </GridItem>
        ) : (
          <div />
        )}
        <IconButton
          icon={show ? <ViewIcon /> : <ViewOffIcon />}
          onClick={handleshowChange}
          aria-label={"Search database"}
        />
      </Grid>
    </>
  );
};
