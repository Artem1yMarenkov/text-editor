import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Sidebar } from "../../shared/ui/Sidebar";

export const SettingsForm = () => {
  const [show, setShow] = useState(false);
  const handleshowChange = (): void => setShow(!show);
  return (
    <Box display="flex" gap="20px">
      <Sidebar />
      <Box mt="5">
        <form>
          <Heading mb="20px" fontSize="32px">
            Настройки
          </Heading>

          <Input
            type="login"
            placeholder="Логин"
            variant={"outline"}
            isRequired
            mb="20px"
          />
          <Input
            type="email"
            placeholder="Адрес эл. почты"
            variant={"outline"}
            isRequired
            mb="20px"
          />
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Пароль"
              variant={"outline"}
              isRequired
              mb="20px"
            />
            <InputRightElement>
              <IconButton
                background={"Inner alignment"}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleshowChange}
                aria-label={"Search database"}
              />
            </InputRightElement>
          </InputGroup>

          <Button colorScheme="#303030;">Сохранить</Button>
        </form>
      </Box>
    </Box>
  );
};
