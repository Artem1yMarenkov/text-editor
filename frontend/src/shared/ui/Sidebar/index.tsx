import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { SettingsIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import { $userInfo, logoutUserFx } from "../../../entities/User";
import { SidebarRecent } from "./SideBarRecent";
import { createPostFx } from "./SideBarRecent/allPosts";

export const Sidebar = () => {
  const userInfo = useStore($userInfo);

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
        height: "100vh",
        borderRadius: "0 10px 10px 0",
        position: "relative",
        padding: "12px",
      }}
    >
      <Flex gap="10px" flexDirection="column">
        <Link to="/">
          <Button variant="sidebar" height="45px" padding="8px">
            <Flex gap="12px" alignItems="center">
              <Avatar name="t" size="sm" borderRadius="8px" />
              <Box>
                <Text mb="1px" fontSize="14px">
                  {userInfo?.login || ""}&apos;s Text Editor
                </Text>
              </Box>
            </Flex>
          </Button>
        </Link>
        <Button onClick={() => createPostFx()}>Create post</Button>
        <SidebarRecent />
        <Link color="" to="/settings">
          <Button variant="sidebar" height="45px" width="100%" padding="8px">
            <Flex gap="12px" alignItems="center">
              <SettingsIcon borderRadius="8px" />
              <Box>
                <Text mb="1px" fontSize="14px">
                  Настройки
                </Text>
              </Box>
            </Flex>
          </Button>
        </Link>
      </Flex>
      <Button
        onClick={handleLogout}
        variant="sidebar"
        color="red"
        fontWeight="400"
      >
        <Flex gap="12px" alignItems="center">
          <ArrowBackIcon borderRadius="8px" color="red" />
          <Text mb="1px" fontSize="16px" color="red">
            Выйти
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};
