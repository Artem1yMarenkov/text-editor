import { Button, Flex, Heading } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useState, useEffect } from "react";
import { $allPosts, getAllPostsFx, update } from "./allPosts";

interface ICard {
  name: string;
  id: number;
}

const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
  if (!(event.target instanceof HTMLElement)) return;
  event.target.style.background = "transparent";
};
const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  if (!(event.target instanceof HTMLElement)) return;
  event.target.style.background = "gray";
};

export const SidebarRecent = () => {
  // TODO: вынести драгндроп в отдельную сущность
  const allPosts = useStore($allPosts);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const updatePosts = (card: ICard) => {
    if (!currentCard || !allPosts) return;
    const tempArr = [...allPosts];
    const oldCardIndex = allPosts.indexOf(currentCard);
    const newCardIndex = allPosts.indexOf(card);
    if (oldCardIndex === newCardIndex) return;
    tempArr.splice(oldCardIndex, 1);
    tempArr.splice(newCardIndex, 0, currentCard);
    update(tempArr);
  };

  const dragStartHandler = (card: ICard) => {
    setCurrentCard(card);
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, card: ICard) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) return;
    event.target.style.background = "transparent";
    updatePosts(card);
  };

  useEffect(() => {
    getAllPostsFx();
  });

  return (
    <Flex flexDirection="column" mt="20px">
      <Heading mb="8px" fontSize="16px">
        Недавнее
      </Heading>
      {allPosts &&
        allPosts.map((card, index) => (
          <Flex
            onDrop={(event) => dropHandler(event, card)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragLeaveHandler(e)}
            onDragStart={() => dragStartHandler(card)}
            draggable
            key={card.name}
            direction="column"
          >
            <Button variant="sidebar" size="sm">
              {card.name}
            </Button>
            {index === allPosts.length - 1 && <hr />}
          </Flex>
        ))}
    </Flex>
  );
};
