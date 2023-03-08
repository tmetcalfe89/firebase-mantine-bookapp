import { useCallback, useMemo } from "react";
import { useSetState } from "@mantine/hooks";
import {
  addEntry as addRemoteEntry,
  getEntries as getRemoteEntries,
  removeEntryById as removeRemoteEntryById,
  updateEntry as updateRemoteEntry,
} from "api/firebase";
import { useMount } from "react-use";
import useBoolean from "./useBoolean";

export default function useFirestore(collection, generalRules = []) {
  const [entries, updateEntries] = useSetState({});
  const [loading, { on: setLoading, off: setLoadingDone }] = useBoolean(true);

  const update = useCallback(async () => {
    setLoading();
    const docs = await getRemoteEntries(collection, generalRules);
    updateEntries(
      docs.reduce((acc, { id, ...entry }) => ({ ...acc, [id]: entry }), {})
    );
    setLoadingDone();
  }, [collection, generalRules, updateEntries, setLoading, setLoadingDone]);

  const add = useCallback(
    async (entry) => {
      setLoading();
      const { id, ...newDoc } = await addRemoteEntry(collection, entry);
      updateEntries({ [id]: newDoc });
      setLoadingDone();
    },
    [collection, updateEntries, setLoading, setLoadingDone]
  );

  const removeById = useCallback(
    async (id) => {
      setLoading();
      await removeRemoteEntryById(collection, id);
      updateEntries({ [id]: undefined });
      setLoadingDone();
    },
    [collection, updateEntries, setLoading, setLoadingDone]
  );

  const updateEntry = useCallback(
    async (entryId, data) => {
      setLoading();
      const { id, ...updatedEntry } = await updateRemoteEntry(
        collection,
        entryId,
        data
      );
      updateEntries({ [id]: updatedEntry });
      setLoadingDone();
    },
    [collection, updateEntries, setLoading, setLoadingDone]
  );

  const externalEntries = useMemo(() => {
    return Object.entries(entries).reduce(
      (acc, [id, entry]) => (entry ? [...acc, { id, ...entry }] : acc),
      []
    );
  }, [entries]);

  useMount(() => {
    update();
  });

  return [
    externalEntries,
    {
      update,
      add,
      removeById,
      updateEntry,
      loading,
    },
  ];
}
