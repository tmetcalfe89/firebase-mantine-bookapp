import { UserContext } from "context/UserContext";
import { useCallback, useContext, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookForm from "./BookForm";

export default function CreateBook() {
  const { addBook } = useContext(UserContext);
  const navigate = useNavigate();
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

  return (
    <BookForm
      onSubmit={handleSubmit}
      book={searchParamsBook}
      submitText="Add Book"
    />
  );
}
