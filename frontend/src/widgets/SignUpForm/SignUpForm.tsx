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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../shared/api";

const initialValues = {
  email: "",
  login: "",
};

const SignUpForm = () => {
  const [values, setValues] = useState(initialValues);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/register", values);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <Box>
      <Container maxW={"2xl"} sx={{ p: "30px" }} border={"1px solid #000"}>
        <Stack spacing={"1rem "}>
          <form onSubmit={handleSubmit}>
            <Heading as={"h1"} size={"lg"}>
              Регистрация
            </Heading>
            <Heading as={"h1"} size={"sm"}>
              Логин и пароль
            </Heading>
            <Stack sx={{ mt: "30px" }}>
              <InputGroup size={"lg"} sx={{ gap: "5" }}>
                <Input
                  name="email"
                  size={"lg"}
                  type="email"
                  isRequired={true}
                  variant={"outline"}
                  placeholder={"Email"}
                  value={values.email}
                  onChange={handleInputChange}
                />
                <Input
                  name="login"
                  type="text"
                  placeholder={"Пароль"}
                  variant={"outline"}
                  isRequired={true}
                  value={values.login}
                  onChange={handleInputChange}
                />
              </InputGroup>
              <Checkbox defaultChecked>
                <Text fontSize={"md"}>Я согласен c условиями оферты.</Text>
              </Checkbox>
            </Stack>
            <Button type="submit" colorScheme={"orange"} size={"lg"}>
              Войти
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUpForm;
