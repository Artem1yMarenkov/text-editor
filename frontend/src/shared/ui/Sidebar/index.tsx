import { Avatar } from "@chakra-ui/react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { logoutUserFx } from "../../../entities/User";

const links = ["Купить собаку", "Помыть молока"];

export const Sidebar = () => {
  
  const handleLogout = () => {
    logoutUserFx();
  };

  return (
    <Flex
      gap="10px"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        background: "#fafafa",
        height: "100%",
        borderRadius: "0 10px 10px 0",
        position: "fixed",
        padding: "12px",
      }}
    >
      <Flex gap="10px" flexDirection="column">
        <Button variant="sidebar" height="45px" padding="8px">
          <Flex gap="12px" alignItems="center">
            <Avatar name="t" size="sm" borderRadius="8px" />
            <Box>
              <Text mb="1px" fontSize="14px">
                Somebody's Text Editor
              </Text>
            </Box>
          </Flex>
        </Button>
      <Button variant="sidebar" height="45px" padding="8px" top="73.89%">
        <Flex gap="12px" alignItems="center">
          <Box>
            <Link color="" href="/settings">
              <Text mb="1px" fontSize="14px">
                Настройки
              </Text>
            </Link>
          </Box>
        </Flex>
      </Button>
        <Flex flexDirection="column" mt="20px">
          <Heading mb="8px" fontSize="16px">
            Недавнее
          </Heading>
          {links.map((linkName, index) => (
            <Flex key={linkName} direction="column">
              <Button variant="sidebar" size="sm">
                {linkName}
              </Button>
              { index == links.length - 1 ? <></> : <hr />} 
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Button onClick={handleLogout} variant="sidebar" color="red" fontWeight="400">← Выйти</Button>
    </Flex>
  );
};
