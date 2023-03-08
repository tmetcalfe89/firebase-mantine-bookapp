import { Stack, Tabs } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import SearchBooks from "./SearchBooks";

export default function CreateBook({ onCreate }) {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [currentTab, setCurrentTab] = useState("builder");

  const handleSubmit = useCallback(
    (newBook) => {
      onCreate(newBook);
      navigate("/books");
    },
    [onCreate, navigate]
  );

  const handleSelectBook = useCallback((bookData) => {
    setSelectedBook(bookData);
    setCurrentTab("builder");
  }, []);

  return (
    <Tabs value={currentTab} onTabChange={setCurrentTab}>
      <Tabs.List>
        <Tabs.Tab value="builder">Builder</Tabs.Tab>
        <Tabs.Tab value="search">Search</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="builder">
        <BookForm
          onSubmit={handleSubmit}
          book={selectedBook}
          submitText="Add Book"
        />
      </Tabs.Panel>

      <Tabs.Panel value="search">
        <SearchBooks onSelect={handleSelectBook} />
      </Tabs.Panel>
    </Tabs>
  );
}
