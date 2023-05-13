import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Heading, IconButton, Input, InputGroup, InputRightElement, Stack, Text, VStack, Link, Container } from '@chakra-ui/react';
import { useState } from 'react';


const SignInForm = () => {
	const [show, setShow] = useState(false)
	const handleshowChange = (): void => setShow(!show)


	return (
		<Box >
			<Container sx={{ p: '30px' }} border={'1px solid #000'} maxW='sm' color='black'>
				<VStack>
					<Stack>
						<Avatar
							size='lg'
							name={''}
						/>{' '}
					</Stack>
					<Stack >
						<Heading sx={{ m: '15px 0 25px' }} as={'h2'} size={'md'} >
							Вход в личный кабинет
						</Heading>
					</Stack>
				</VStack>
				<Stack spacing={'1rem'} >
					<Input size={'lg'} type='email' placeholder={'Email'} variant={'outline'} isRequired={true} />
					<InputGroup size={'lg'}>
						<Input type={show ? 'text' : 'password'} placeholder={'Пароль'} variant={'outline'} isRequired={true} />
						<InputRightElement  >
							<IconButton background={'inherit'} icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={handleshowChange} aria-label={'Search database'}></IconButton>
						</InputRightElement>
					</InputGroup>
					<Button colorScheme={'orange'} size={'lg'}>Войти</Button>
				</Stack>
				<VStack sx={{ mt: '10px' }} >
					<Stack>
						<Text>
							Нет аккаунта?
						</Text>
					</Stack>
					<Stack>
						<Link color='blue.600' href='#'>Зарегестрироваться</Link>
					</Stack>
				</VStack>
			</Container>
		</Box >
	);
};

export default SignInForm;