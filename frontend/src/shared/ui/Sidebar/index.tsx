import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import { logoutUserFx } from "../../../entities/User";
import { SidebarRecent } from "./SideBarRecent";

const links = ["Купить собаку", "Помыть молока"];

export const Sidebar = () => {
  const handleLogout = async () => {
    await logoutUserFx();
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
                Somebody&apos;s Text Editor
              </Text>
            </Box>
          </Flex>
        </Button>
        <SidebarRecent />
        <Button variant="sidebar" height="45px" padding="8px">
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
      </Flex>
      <Button
        onClick={handleLogout}
        variant="sidebar"
        color="red"
        fontWeight="400"
      >
        ← Выйти
      </Button>
    </Flex>
  );
};
