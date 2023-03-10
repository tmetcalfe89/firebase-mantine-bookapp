import { useMemo } from "react";

export default function useCategories(list = [], categoryKey) {
  const categorized = useMemo(() => {
    return list.reduce(
      (acc, entry) => ({
        ...acc,
        [entry[categoryKey]]: [...(acc[entry[categoryKey]] || []), entry],
      }),
      {}
    );
  }, [list, categoryKey]);

  return categorized;
}
