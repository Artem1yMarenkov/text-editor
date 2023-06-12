import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEvent, useStore } from "effector-react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IPostContent } from "../../../../widgets/PostEditor/types";
import { $postList, deletePostFx, fetchPostsFx, update } from "./alPosts";
import { changeContent } from "../../../../widgets/PostEditor/post";

export const SidebarRecent = () => {
  const postList = useStore($postList);
  const fetchPosts = useEvent(fetchPostsFx);
  const loading = useStore(fetchPostsFx.pending);
  const [currentCard, setCurrentCard] = useState<IPostContent | null>(null);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updatePosts = (card: IPostContent) => {
    if (!currentCard || !postList) return;
    const tempArr = [...postList];
    const oldCardIndex = postList.indexOf(currentCard);
    tempArr.splice(oldCardIndex, 1);
    const newCardIndex = postList.indexOf(card);
    tempArr.splice(newCardIndex, 0, currentCard);
    if (oldCardIndex === newCardIndex) return;
    update(tempArr);
  };

  const changeBackground = (
    event: React.DragEvent<HTMLDivElement>,
    color: string
  ) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) return;
    event.target.style.background = color;
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    card: IPostContent
  ) => {
    event.preventDefault();
    changeBackground(event, "transparent");
    updatePosts(card);
  };

  useEffect(() => {
    getAllPostsFx();
  }, []);

  return (
    <Flex flexDirection="column" mt="20px">
      <Heading mb="8px" fontSize="16px">
        Недавнее
      </Heading>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          {postList?.map((card, index) => (
            <Flex
              draggable
              onDrop={(event) => dropHandler(event, card)}
              onDragOver={(e) => changeBackground(e, "gray")}
              onDragLeave={(e) => changeBackground(e, "transparent")}
              onDragEnd={(e) => changeBackground(e, "transparent")}
              onDragStart={() => setCurrentCard(card)}
              onClick={() => changeContent(card)}
              key={card._id}
              direction="column"
            >
              <Button variant="sidebar" size="sm">
                <Flex justifyContent="space-between">
                  <Box>
                    <Text>{card.title}</Text>
                  </Box>
                  <DeleteIcon
                    style={{ position: "absolute", right: "1em" }}
                    onClick={() => deletePostFx(card._id.toString())}
                  />
                </Flex>
              </Button>
              {index === postList.length - 1 && <hr />}
            </Flex>
          ))}
        </div>
      )}
    </Flex>
  );
};
