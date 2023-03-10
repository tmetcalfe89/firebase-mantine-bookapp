import { useState } from "react";
import useCategories from "./useCategories";
import useFirestore from "./useFirestore";

export default function useBooks() {
  const [
    books,
    {
      add: addBook,
      updateEntry: updateBook,
      removeById: removeBook,
      loading: loadingBooks,
      fetchRemote: fetchBooks,
    },
  ] = useFirestore("books");
  const [category, setCategory] = useState(null);
  const categorizedBooks = useCategories(books, category);

  return {
    books,
    addBook,
    updateBook,
    removeBook,
    loadingBooks,
    fetchBooks,
    bookCategory: category,
    categorizeBooksBy: setCategory,
    categorizedBooks,
  };
}
