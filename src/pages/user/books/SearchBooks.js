import { Button, Group, Image, Stack, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";

const searchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  const data = await response.json();
  return data.items
    .map((book) => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(", "),
      image: book.volumeInfo.imageLinks?.thumbnail,
    }))
    .filter(({ title, author, image }) => title && author && image);
};

export default function SearchBooks({ onSelect }) {
  const [searchResults, setSearchResults] = useState([]);
  const form = useForm({
    initialValues: {
      searchTerm: "",
    },
  });

  const handleSearch = useCallback(async () => {
    setSearchResults(await searchBooks(form.values.searchTerm));
    form.onReset();
  }, [form]);

  return (
    <Stack>
      <Group align="flex-end">
        <TextInput
          label="Search Term"
          description="What are you looking for?"
          {...form.getInputProps("searchTerm")}
          style={{ flexGrow: 1 }}
        />
        <Button onClick={handleSearch}>Search Google Books</Button>
      </Group>
      <Group position="center">
        {searchResults.map((book) => (
          <Tooltip label={`${book.title} by ${book.author}`} position="bottom">
            <Image src={book.image} maw={250} onClick={() => onSelect(book)} />
          </Tooltip>
        ))}
      </Group>
    </Stack>
  );
}
