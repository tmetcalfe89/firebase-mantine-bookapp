import { useMemo, useRef } from "react";
import { DateInput as MantineDateInput } from "@mantine/dates";

export default function DateInput({ value, ...props }) {
  const ref = useRef();
  const internalValue = useMemo(() => {
    if (!value) return undefined;
    if (value.seconds) {
      return new Date(value.seconds * 1000);
    }
    return new Date(value);
  }, [value]);

  return (
    <MantineDateInput
      ref={ref}
      valueFormat="YYYY-MM-DD"
      value={internalValue}
      allowDeselect
      {...props}
    />
  );
}
