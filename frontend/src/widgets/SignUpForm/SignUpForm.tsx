import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUpForm = () => {
  const [show, setShow] = useState(false);
  const handleshowChange = (): void => setShow(!show);
  return (
    <Box>
      <Container maxW={"2xl"} sx={{ p: "30px" }} border={"1px solid #000"}>
        <Stack spacing={"1rem "}>
          <Heading as={"h1"} size={"lg"}>
            Регистрация
          </Heading>
          <Heading as={"h1"} size={"sm"}>
            Логин и пароль
          </Heading>
          <Stack sx={{ mt: "30px" }}>
            <InputGroup size={"lg"} sx={{ gap: "5" }}>
              <Input
                size={"lg"}
                type="email"
                placeholder={"Email"}
                variant={"outline"}
                isRequired={true}
              />
              <Input
                type={show ? "text" : "password"}
                placeholder={"Пароль"}
                variant={"outline"}
                isRequired={true}
              />
              <InputRightElement>
                <IconButton
                  background={"inherit"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleshowChange}
                  aria-label={"Search database"}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
            <Checkbox defaultChecked>
              <Text fontSize={"md"}>Я согласен c условиями оферты.</Text>
            </Checkbox>
          </Stack>
          <Button colorScheme={"orange"} size={"lg"}>
            Войти
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUpForm;
