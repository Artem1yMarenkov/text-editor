import { Avatar, Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { SettingsIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { logoutUserFx } from "../../../entities/User";
import { SidebarRecent } from "./SideBarRecent";

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
        <Link color="" href="/settings" textDecoration={"none"}>
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

