import { ChakraProvider } from '@chakra-ui/react'
import { HomePage } from '../pages/Home'
import { theme } from './theme'

function App() {
	return (
		<>
			<ChakraProvider theme={theme}>
				<HomePage />
			</ChakraProvider>
		</>
	)
}

export default App
