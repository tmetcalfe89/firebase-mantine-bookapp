import { Button, Stack } from "@mantine/core";
import { UserContext } from "context/UserContext";
import { useCallback, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "./BookForm";

export default function EditBook() {
  const { books, removeBook, updateBook } = useContext(UserContext);
  const { bookId } = useParams();
  const navigate = useNavigate();

  const selectedBook = useMemo(() => {
    return books.find((book) => book.id === bookId);
  }, [books, bookId]);

  const handleRemoveBook = useCallback(() => {
    removeBook(bookId);
    navigate("/books");
  }, [removeBook, navigate, bookId]);

  return (
    <Stack>
      <BookForm
        book={selectedBook}
        onSubmit={(newData) => updateBook(bookId, newData)}
        submitText="Save Book Data"
      />
      <Button onClick={handleRemoveBook} color="red">
        Remove Book
      </Button>
    </Stack>
  );
}
