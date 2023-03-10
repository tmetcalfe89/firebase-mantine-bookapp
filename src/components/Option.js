import { Group, Text } from "@mantine/core";
import { forwardRef } from "react";

function Option({ label, icon, description, ...props }, ref) {
  return (
    <div ref={ref} {...props}>
      <Group noWrap>
        {icon}
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  );
}

export default forwardRef(Option);
