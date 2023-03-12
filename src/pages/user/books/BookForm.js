import { Box, Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import DateInput from "components/DateInput";
import Option from "components/Option";
import categories from "data/statuses";
import { useCallback, useEffect } from "react";

const defaultBook = {
  title: "",
  author: "",
  image: "",
  started: undefined,
  finished: undefined,
  status: "",
};

export default function BookForm({ onSubmit, book, submitText }) {
  const form = useForm({
    initialValues: book || defaultBook,
  });

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

  return (
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
          {...form.getInputProps("status")}
        />
        <Button type="submit">{submitText}</Button>
      </Stack>
    </Box>
  );
}
