import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Heading,
  Button,
  IconButton,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Sidebar } from "../../shared/ui/Sidebar";
import { $userInfo, updateUserInfoFx } from "../../entities/User";
import { IUser } from "../../entities/User/types";

export const SettingsForm = () => {
  const [show, setShow] = useState(false);
  const userInfo = useStore($userInfo);
  const updateUserInfoPending = useStore(updateUserInfoFx.pending);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<Partial<IUser>>({
    defaultValues: {
      email: userInfo?.email,
      login: userInfo?.login,
    },
  });

  useEffect(() => {
    setValue("email", userInfo?.email);
    setValue("login", userInfo?.login);
  }, [userInfo, setValue]);

  const handleshowChange = (): void => setShow(!show);

  return (
    <Box display="flex" gap="20px">
      <Sidebar />
      <Box mt="5">
        <Link to="/">
          <Button variant="unstyled">← Назад</Button>
        </Link>
        <form onSubmit={handleSubmit(updateUserInfoFx)}>
          <Heading mb="20px" mt="10px">
            Настройки пользователя
          </Heading>
          <FormControl isInvalid={!!errors.login} mb="10px">
            <Input
              type="login"
              placeholder="Логин"
              variant="outline"
              defaultValue={userInfo?.login}
              {...register("login", { required: true })}
            />
            {!!errors.login && (
              <FormHelperText color="red">
                Логин обязателен для заполнения
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email} mb="10px">
            <Input
              type="email"
              placeholder="Адрес эл. почты"
              variant="outline"
              defaultValue={userInfo?.email}
              {...register("email", { required: true })}
            />
            {!!errors.email && (
              <FormHelperText color="red">
                Адрес эл. почты обязателен для заполнения
              </FormHelperText>
            )}
          </FormControl>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Введите новый пароль"
              variant={"outline"}
              mb="20px"
              {...register("password")}
            />
            <InputRightElement>
              <IconButton
                background="transparent"
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleshowChange}
                aria-label="Show/hide password"
              />
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="#303030;"
            isLoading={updateUserInfoPending}
            disabled={updateUserInfoPending}
            type="submit"
          >
            Сохранить
          </Button>
        </form>
      </Box>
    </Box>
  );
};
