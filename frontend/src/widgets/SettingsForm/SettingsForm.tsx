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
import { useStore } from "effector-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Sidebar } from "../../shared/ui/Sidebar";
import { $userInfo, updateUserInfoFx } from "../../entities/User";
import { IUser } from "../../entities/User/types";

export const SettingsForm = () => {
  const { handleSubmit, register } = useForm<Partial<IUser>>();
  const [show, setShow] = useState(false);
  const userInfo = useStore($userInfo);
  const updateUserInfoPending = useStore(updateUserInfoFx.pending);

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
            Настройки
          </Heading>
          <Input
            type="login"
            placeholder="Логин"
            variant={"outline"}
            isRequired
            mb="20px"
            defaultValue={userInfo?.login}
            {...register("login", { required: true })}
          />
          <Input
            type="email"
            placeholder="Адрес эл. почты"
            variant={"outline"}
            isRequired
            mb="20px"
            defaultValue={userInfo?.email}
            {...register("email", { required: true })}
          />
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
                background={"Inner alignment"}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
                onClick={handleshowChange}
                aria-label={"Search database"}
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
