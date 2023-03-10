import { Tabs } from "@mantine/core";
import { UserContext } from "context/UserContext";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookForm from "./BookForm";
import SearchBooks from "./SearchBooks";

export default function CreateBook() {
  const { addBook } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(undefined);
  const [currentTab, setCurrentTab] = useState("builder");
  const [searchParams] = useSearchParams();

  const searchParamsBook = useMemo(() => {
    const { author, status } = Object.fromEntries(searchParams.entries());
    if (!author && !status) return null;
    return { author, status };
  }, [searchParams]);

  const handleSubmit = useCallback(
    (newBook) => {
      addBook(newBook);
      navigate("/books");
    },
    [addBook, navigate]
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
          book={selectedBook || searchParamsBook}
          submitText="Add Book"
        />
      </Tabs.Panel>

      <Tabs.Panel value="search">
        <SearchBooks onSelect={handleSelectBook} />
      </Tabs.Panel>
    </Tabs>
  );
}
