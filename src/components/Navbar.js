import { Navbar as MNavbar } from "@mantine/core";
import dims from "data/dims";

export default function Navbar({ children }) {
  return <MNavbar width={{ base: dims.navbarWidth }}>{children}</MNavbar>;
}

Navbar.Section = MNavbar.Section;
