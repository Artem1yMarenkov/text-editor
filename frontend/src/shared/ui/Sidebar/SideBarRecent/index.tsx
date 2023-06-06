import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

interface ICard {
  name: string;
  id: number;
  order: number;
}

export const SidebarRecent = () => {
  // TODO: вынести драгндроп в отдельную сущность(для переиспользования)
  const [recentLinks, setRecentLinks] = useState<ICard[]>([
    { name: "12121", id: 2134, order: 0 },
    { name: "121221", id: 22134, order: 1 },
    { name: "12123213211", id: 2134124, order: 2 },
    { name: "132121221", id: 22134214, order: 3 },
  ]);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const dragStartHandler = (card: ICard) => {
    setCurrentCard(card);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault();
    setRecentLinks(
      recentLinks.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard!.order };
        }
        if (c.id === currentCard?.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  };

  const sortCards = (a: ICard, b: ICard) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <Flex flexDirection="column" mt="20px">
      <Heading mb="8px" fontSize="16px">
        Недавнее
      </Heading>
      {recentLinks.sort(sortCards).map((card, index) => (
        <Flex
          draggable
          onDragStart={() => dragStartHandler(card)}
          onDrop={(e) => dropHandler(e, card)}
          key={card.name}
          direction="column"
        >
          <Button variant="sidebar" size="sm">
            {card.name}
          </Button>
          {index === recentLinks.length - 1 && <hr />}
        </Flex>
      ))}
    </Flex>
  );
};
