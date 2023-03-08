import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import local from "data/local";
import { useCallback } from "react";

export default function AppWrapper({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    defaultValue: "light",
    key: local.colorScheme,
  });

  const toggleColorScheme = useCallback(() => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setColorScheme]);

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        {children}
      </ColorSchemeProvider>
    </MantineProvider>
  );
}
