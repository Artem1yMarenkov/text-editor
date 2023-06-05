import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        sidebar: {
          bg: "transparent",
          textAlign: "left",
          justifyContent: "flex-start",
          _hover: {
            background: "#e7e7e792",
          },
          _active: {
            background: "#e7e7e7",
          },
        },
      },
    },
  },
});
