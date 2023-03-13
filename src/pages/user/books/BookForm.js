import {
  Box,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import DateInput from "components/DateInput";
import Option from "components/Option";
import categories from "data/statuses";
import useBoolean from "hooks/useBoolean";
import { useCallback, useEffect, useState } from "react";
import SearchBooks from "./SearchBooks";

const defaultBook = {
  title: "",
  author: "",
  image: "",
  started: null,
  finished: null,
  status: "",
  thoughts: "",
};

export default function BookForm({ onSubmit, book, submitText }) {
  const form = useForm({
    initialValues: book || defaultBook,
  });
  const [searchShown, { on: showSearch, off: hideSearch }] = useBoolean(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(form.values);
    },
    [onSubmit, form.values]
  );

  useEffect(() => {
    form.setValues(book);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const handleShowSearch = useCallback(() => {
    showSearch();
    setSearchTerm(`${form.values.title} ${form.values.author}`);
  }, [showSearch, form.values.title, form.values.author]);

  const handleSelectBook = useCallback(
    (bookData) => {
      form.setValues(bookData);
      hideSearch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hideSearch]
  );

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Title"
            description="What is your new favorite book called?"
            required
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Author"
            description="Who wrote your new favorite book?"
            required
            {...form.getInputProps("author")}
          />
          <Button disabled={!form.values.title} onClick={handleShowSearch}>
            Search for Book Details
          </Button>
          <TextInput
            label="Image"
            description="Can I have a link to an image of your new favorite book?"
            {...form.getInputProps("image")}
          />
          <Group grow>
            <DateInput
              label="Started"
              description="When did you start reading the book?"
              {...form.getInputProps("started")}
            />
            <DateInput
              label="Finished"
              description="When did you finish reading the book?"
              {...form.getInputProps("finished")}
            />
          </Group>
          <Select
            label="Status"
            data={categories}
            itemComponent={Option}
            required
            description="How far through it are you?"
            {...form.getInputProps("status")}
          />
          {form.values.status === "Read" && (
            <Textarea
              label="Thoughts"
              description="What are your thoughts on the book?"
              {...form.getInputProps("thoughts")}
            />
          )}
          <Button type="submit">{submitText}</Button>
        </Stack>
      </Box>
      <Modal
        opened={searchShown}
        onClose={hideSearch}
        title="Search for Book Data"
        size="xl"
      >
        <SearchBooks onSelect={handleSelectBook} searchTerm={searchTerm} />
      </Modal>
    </>
  );
}
