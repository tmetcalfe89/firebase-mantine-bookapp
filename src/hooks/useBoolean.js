import { useCallback, useState } from "react";

export default function useBoolean(initial) {
  const [val, setVal] = useState(initial);

  const toggle = useCallback(() => {
    setVal((p) => !p);
  }, []);

  const on = useCallback(() => {
    setVal(true);
  }, []);

  const off = useCallback(() => {
    setVal(false);
  }, []);

  return [val, { toggle, on, off }];
}
