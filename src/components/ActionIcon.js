import { ActionIcon as MActionIcon } from "@mantine/core";
import dims from "data/dims";

export default function ActionIcon({ onClick, icon: Icon, ...props }) {
  return (
    <MActionIcon
      variant="default"
      onClick={onClick}
      size={dims.actionIcon}
      {...props}
    >
      {Icon && <Icon size={dims.actionIconInternal} />}
    </MActionIcon>
  );
}
