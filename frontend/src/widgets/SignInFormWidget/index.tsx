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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ILoginFormState } from "../../entities/User/types";
import { loginUserFx } from "../../entities/User";
import { $isLogin } from "../../app/auth";

const SignInForm = () => {
  const loginPenging = useStore(loginUserFx.pending);
  const isLogin = useStore($isLogin);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<ILoginFormState>({
    defaultValues: {
      email: null,
      password: null,
    },
  });

  const handleshowChange = (): void => setShow(!show);

  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <Box>
      <Container
        sx={{
          p: "30px",
          mt: "40px",
          boxShadow: "0 0 30px #cdcdcd",
          borderRadius: "10px",
          maxW: "md",
        }}
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
        <form onSubmit={handleSubmit(loginUserFx)}>
          <Stack spacing={"1rem"}>
            <Input
              size={"lg"}
              type="email"
              placeholder={"Email"}
              variant={"outline"}
              isRequired
              {...register("email", { required: true })}
            />
            <InputGroup size={"lg"}>
              <Input
                type={show ? "text" : "password"}
                placeholder={"Пароль"}
                variant={"outline"}
                isRequired
                {...register("password", { required: true })}
              />
              <InputRightElement>
                <IconButton
                  background={"inherit"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleshowChange}
                  aria-label={"Search database"}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              isDisabled={loginPenging}
              isLoading={loginPenging}
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
            <Link color="blue.600" href="/register">
              Зарегистрироваться
            </Link>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignInForm;
