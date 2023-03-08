import { Button, Stack } from "@mantine/core";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "./BookForm";

export default function EditBook({ books, onSave, onRemove }) {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const selectedBook = useMemo(() => {
    return books.find((book) => book.id === bookId);
  }, [books, bookId]);

  const handleRemoveBook = useCallback(() => {
    onRemove(bookId);
    navigate("/books");
  }, [onRemove, navigate, bookId]);

  return (
    <Stack>
      <BookForm
        book={selectedBook}
        onSubmit={(newData) => onSave(bookId, newData)}
        submitText="Save Book Data"
      />
      <Button onClick={handleRemoveBook} color="red">
        Remove Book
      </Button>
    </Stack>
  );
}
