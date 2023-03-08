import { useState } from "react";
import { useKey } from "react-use";

export default function useShiftDown() {
  const [shiftDown, setShiftDown] = useState(false);

  useKey(
    (e) => {
      return e.key === "Shift";
    },
    () => {
      setShiftDown(true);
    }
  );

  useKey(
    (e) => {
      return e.key === "Shift";
    },
    () => {
      setShiftDown(false);
    },
    { event: "keyup" }
  );

  return shiftDown;
}
