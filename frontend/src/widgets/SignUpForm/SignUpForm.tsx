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
import { useForm } from "react-hook-form";
import { IFormState } from "./types";
import { $registerUserPending, $registerUserResponseState, registerUserFx, setRegisterUserResponseState } from "./store";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignUpForm = () => {
	const registerUserPending = useStore($registerUserPending);
	const registerUserResponseState = useStore($registerUserResponseState);
	
	const navigate = useNavigate();
	const { handleSubmit, register } = useForm<IFormState>({
		defaultValues: {
			email: null,
			login: null
		}
	});

	useEffect(() => {
		if (registerUserResponseState == 200) {
			navigate("/login");
		}

		setRegisterUserResponseState(null);
	}, [registerUserResponseState, navigate]);

	return (
		<Box>
			<Container
				sx={{ 
					p: "30px", 
					mt: "40px", 
					boxShadow: "0 0 30px #cdcdcd", 
					borderRadius: "10px",
					maxW: "2xl"
				}}
			>
				<form onSubmit={handleSubmit(registerUserFx)}>
					<Stack spacing="1rem ">
						<Heading as="h1" size="lg">Регистрация</Heading>
						<Heading as="h1" size="sm">Адрес эл. почты и логин</Heading>
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
							isDisabled={registerUserPending} 
							isLoading={registerUserPending}
						>
							Зарегистрироваться
						</Button>
					</Stack>
				</form>
			</Container>
		</Box>
	);
};

export default SignUpForm;
