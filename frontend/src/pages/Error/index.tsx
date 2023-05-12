import { useRouteError } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>404</h1>
      <Button variant="unstyled" size="sm" sx={{ mb: "20px"}}>← Назад</Button>
      <p>пизда полная произошла</p>
    </div>
  );
}
