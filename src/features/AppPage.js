import { Image, LoadingOverlay, useMantineColorScheme } from "@mantine/core";
import Page from "components/Page";
import colorSchemes from "data/colorSchemes";
import dims from "data/dims";
import project from "data/project";

export default function AppPage({ loading, children, ...props }) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Page
      logo={
        <Image
          width={dims.actionIcon}
          height={dims.actionIcon}
          fit="contain"
          src={project.logo}
          style={{
            filter: `invert(${colorScheme === colorSchemes.dark.name ? 1 : 0})`,
          }}
        />
      }
      {...props}
    >
      {children}
      <LoadingOverlay visible={loading} overlayBlur={2} />
    </Page>
  );
}
