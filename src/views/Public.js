import { Button, Stack, Title } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import project from "data/project";
import AppPage from "features/AppPage";
import { authenticate } from "../api/firebase";

export default function Public() {
  return (
    <AppPage>
      <Stack pr="xs">
        <Title align="center">Welcome to {project.name}!</Title>
        <Button
          onClick={authenticate}
          style={{ alignSelf: "center" }}
          leftIcon={<IconBrandGoogle />}
        >
          Log In with Google
        </Button>
      </Stack>
    </AppPage>
  );
}
