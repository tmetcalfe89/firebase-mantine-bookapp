import { Box, Button, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Option from "components/Option";
import categories from "data/categories";
import { useCallback, useEffect } from "react";

const defaultBook = {
  title: "",
  author: "",
  image: "",
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
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Author"
          description="Who wrote your new favorite book?"
          {...form.getInputProps("author")}
        />
        <TextInput
          label="Image"
          description="Can I have a link to an image of your new favorite book?"
          {...form.getInputProps("image")}
        />
        <Select
          label="Status"
          data={categories}
          itemComponent={Option}
          {...form.getInputProps("status")}
        />
        <Button type="submit">{submitText}</Button>
      </Stack>
    </Box>
  );
}
