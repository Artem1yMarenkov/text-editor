import { Box } from "@chakra-ui/react";
import { Sidebar } from "../../shared/ui/Sidebar";
import { PostEditorWidget } from "../../widgets/PostEditor";

export const HomePage = () => (
  <Box display="flex" gap="20px">
    <Sidebar />
    <Box padding="20px" width="100%" margin="auto">
      <PostEditorWidget />
    </Box>
  </Box>
);
