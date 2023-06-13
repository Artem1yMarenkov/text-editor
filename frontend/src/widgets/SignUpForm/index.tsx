import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import { registerUserFx } from "../../entities/User";
import { IRegisterFormState } from "../../entities/User/types";
import { $registerStatus } from "./store";

const SignUpForm = () => {
  const { handleSubmit, register } = useForm<IRegisterFormState>({
    defaultValues: {
      email: null,
      login: null,
    },
  });

  const registerStatus = useStore($registerStatus);
  const registerPending = useStore(registerUserFx.pending);

  const navigate = useNavigate();

  useEffect(() => {
    if (registerStatus === 200) {
      navigate("/");
    }
  }, [registerStatus, navigate]);

  return (
    <Box>
      <Container
        sx={{
          p: "30px",
          mt: "40px",
          boxShadow: "0 0 30px #cdcdcd",
          borderRadius: "10px",
          maxW: "2xl",
        }}
      >
        <form onSubmit={handleSubmit(registerUserFx)}>
          <Stack spacing="1rem ">
            <Heading as="h1" size="lg">
              Регистрация
            </Heading>
            <Heading as="h1" size="sm">
              Адрес эл. почты и логин
            </Heading>
            <Stack sx={{ mt: "30px" }}>
              <InputGroup size="lg" sx={{ gap: "5" }}>
                <Input
                  size="lg"
                  type="email"
                  placeholder="Адрес эл. почты"
                  variant="outline"
                  isRequired
                  {...register("email", { required: true })}
                />
                <Input
                  type="text"
                  placeholder="Логин"
                  variant="outline"
                  isRequired
                  {...register("login", { required: true })}
                />
              </InputGroup>
              <Checkbox defaultChecked isRequired>
                <Text fontSize="md">Я согласен c условиями оферты.</Text>
              </Checkbox>
            </Stack>
            <Button
              type="submit"
              colorScheme={"orange"}
              size="lg"
              isDisabled={registerPending}
              isLoading={registerPending}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </form>
        <VStack sx={{ mt: "20px" }}>
          <Stack>
            <Text>Есть аккаунт?</Text>
          </Stack>
          <Stack>
            <Link to="/" style={{ color: "#235a97" }}>
              Войти
            </Link>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignUpForm;
