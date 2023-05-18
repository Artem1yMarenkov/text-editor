import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  Link,
  Container,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import {
  $userLoginPending,
  $userLoginResponseStatus,
  fetchUserLoginFx,
} from "./store";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IFormState } from "./types";
import { $isLogin } from "../../entities/Auth";

const SignInForm = () => {
  const [show, setShow] = useState(false);

  const isLogin = useStore($isLogin);
  const userLoginPending = useStore($userLoginPending);
  const userLoginResponseStatus = useStore($userLoginResponseStatus);

  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<IFormState>({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleshowChange = (): void => setShow(!show);

  useEffect(() => {
    if (userLoginResponseStatus === 200 || isLogin) {
      navigate("/");
    }
  }, [userLoginResponseStatus, navigate, isLogin]);

  return (
    <Box>
      <Container
        sx={{ p: "30px" }}
        border={"1px solid #000"}
        maxW="sm"
        color="black"
      >
        <VStack>
          <Stack>
            <Avatar size="lg" name={""} />{" "}
          </Stack>
          <Stack>
            <Heading sx={{ m: "15px 0 25px" }} as={"h2"} size={"md"}>
              Вход в личный кабинет
            </Heading>
          </Stack>
        </VStack>
        <form onSubmit={handleSubmit(fetchUserLoginFx)}>
          <Stack spacing={"1rem"}>
            <Input
              size={"lg"}
              type="email"
              placeholder={"Email"}
              variant={"outline"}
              isRequired={true}
              {...register("email", { required: true })}
            />
            <InputGroup size={"lg"}>
              <Input
                type={show ? "text" : "password"}
                placeholder={"Пароль"}
                variant={"outline"}
                isRequired={true}
                {...register("password", { required: true })}
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
            <Button
              type="submit"
              isDisabled={userLoginPending}
              isLoading={userLoginPending}
              colorScheme={"orange"}
              size={"lg"}
            >
              Войти
            </Button>
          </Stack>
        </form>
        <VStack sx={{ mt: "10px" }}>
          <Stack>
            <Text>Нет аккаунта?</Text>
          </Stack>
          <Stack>
            <Link color="blue.600" href="#">
              Зарегестрироваться
            </Link>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignInForm;
