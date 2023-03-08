import { IconMoonStars, IconSun } from "@tabler/icons-react";

const colorSchemes = {
  dark: {
    name: "dark",
    icon: IconMoonStars,
    backgroundColor: (theme) => theme.colors.dark[8],
  },
  light: {
    name: "light",
    icon: IconSun,
    backgroundColor: (theme) => theme.colors.gray[0],
  },
};

export default colorSchemes;
