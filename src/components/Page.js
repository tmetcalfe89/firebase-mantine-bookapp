import {
  AppShell,
  Box,
  Group,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import Navbar from "components/Navbar";
import ActionIcon from "components/ActionIcon";
import dims from "data/dims";
import colorSchemes from "data/colorSchemes";
import project from "data/project";

export default function Page({ sideNav, topNav, logo, children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding={dims.appPadding}
      navbar={<Navbar>{sideNav}</Navbar>}
      header={
        <Header height={dims.headerHeight}>
          <Group
            sx={{ height: "100%" }}
            px={dims.headerPadding}
            position="apart"
          >
            <Group>
              <span>{logo}</span>
              <span>{project.name}</span>
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
  );
}
