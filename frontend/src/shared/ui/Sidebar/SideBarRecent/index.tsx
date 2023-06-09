import { Button, Flex, Heading } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useState, useEffect } from "react";
import { $allPosts, getAllPostsFx, update } from "./allPosts";

interface ICard {
  name: string;
  id: number;
}

export const SidebarRecent = () => {
  const allPosts = useStore($allPosts);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const updatePosts = (card: ICard) => {
    if (!currentCard || !allPosts) return;
    const tempArr = [...allPosts];
    const oldCardIndex = allPosts.indexOf(currentCard);
    tempArr.splice(oldCardIndex, 1);
    const newCardIndex = allPosts.indexOf(card);
    tempArr.splice(newCardIndex, 0, currentCard);
    if (oldCardIndex === newCardIndex) return;
    console.log(tempArr);
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

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, card: ICard) => {
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
      {allPosts &&
        allPosts.map((card, index) => (
          <Flex
            onDrop={(event) => dropHandler(event, card)}
            onDragOver={(e) => changeBackground(e, "gray")}
            onDragLeave={(e) => changeBackground(e, "transparent")}
            onDragEnd={(e) => changeBackground(e, "transparent")}
            onDragStart={() => setCurrentCard(card)}
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
