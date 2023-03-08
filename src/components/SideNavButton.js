import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function SideNavButton({ children, to, onClick, color }) {
  return (
    <Button
      style={{ flexGrow: 1, borderRadius: 0 }}
      onClick={onClick}
      color={color}
      variant="subtle"
      component={to ? Link : undefined}
      to={to}
    >
      {children}
    </Button>
  );
}
