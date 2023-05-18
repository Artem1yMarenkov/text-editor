import { Avatar } from "@chakra-ui/react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { setIsLogin } from "../../../entities/Auth";
import { setUserLoginResponseStatus } from "../../../widgets/SIgnInForm/store";
const links = ["Купить собаку", "Помыть молока"];
export const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setUserLoginResponseStatus(400);
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
        <Heading mb="1px" fontSize="18px">
          Недавнее
        </Heading>
        {links.map((linkName) => (
          <Button variant="sidebar" key={linkName}>
            {linkName}
          </Button>
        ))}
      </Flex>
      <Button onClick={handleLogout}>Выйти</Button>
    </Flex>
  );
};
