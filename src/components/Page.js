import {
  Anchor,
  AppShell,
  Box,
  Group,
  Header,
  Modal,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Navbar from "components/Navbar";
import ActionIcon from "components/ActionIcon";
import dims from "data/dims";
import colorSchemes from "data/colorSchemes";
import project from "data/project";
import useBoolean from "hooks/useBoolean";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";

export default function Page({ sideNav, topNav, logo, children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [
    displayPrivacyPolicy,
    { on: showPrivacyPolicy, off: hidePrivacyPolicy },
  ] = useBoolean(false);
  const theme = useTheme();

  return (
    <>
      <AppShell
        padding={dims.appPadding}
        navbar={
          <Navbar>
            <Navbar.Section grow>{sideNav}</Navbar.Section>
            <Navbar.Section p="xs">
              <Anchor onClick={showPrivacyPolicy}>Privacy Policy</Anchor>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={dims.headerHeight}>
            <Group
              sx={{ height: "100%" }}
              px={dims.headerPadding}
              position="apart"
            >
              <Group
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  color:
                    colorScheme === colorSchemes.dark.name
                      ? theme.white
                      : theme.black,
                }}
              >
                {logo}
                <Text>{project.name}</Text>
              </Group>
              <Group>
                {topNav}
                <ActionIcon
                  onClick={() => toggleColorScheme()}
                  icon={
                    colorScheme === colorSchemes.dark.name
                      ? colorSchemes.light.icon
                      : colorSchemes.dark.icon
                  }
                />
              </Group>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === colorSchemes.dark.name
                ? colorSchemes.dark.backgroundColor(theme)
                : colorSchemes.light.backgroundColor(theme),
          },
        })}
      >
        <Box pr={dims.appPaddingInner}>{children}</Box>
      </AppShell>
      <Modal
        opened={displayPrivacyPolicy}
        onClose={hidePrivacyPolicy}
        title="Privacy Policy"
      >
        <Stack>
          <Title order={3}>Types of data we collect</Title>
          <Text>
            We collect your email address, as well as the book data you submit.
          </Text>
          <Title order={3}>What we do with your data</Title>
          <Text>It sits in a database. We don't sell it.</Text>
        </Stack>
      </Modal>
    </>
  );
}
