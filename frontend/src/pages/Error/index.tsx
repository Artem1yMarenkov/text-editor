import { useNavigate, useRouteError } from "react-router";
import { Button, Center, Flex, Box, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <Center width="100%" height="100vh">
      <Flex flexDirection="column" alignItems="center" gap="20px">
        <Box textAlign="center">
          <Heading size="4xl">404</Heading>
          <Text fontSize="xl">Мы ничего не нашли!</Text>
        </Box>
        <Button
          onClick={() => navigate("/")}
          size="md"
          variant='outline'
          colorScheme="orange"
          sx={{ mb: "20px" }}
        >
          ← Назад
        </Button>
      </Flex>
    </Center>
  );
}
