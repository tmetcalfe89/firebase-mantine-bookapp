import { auth } from "api/firebase";
import useBooks from "hooks/useBooks";
import { useAuthState } from "react-firebase-hooks/auth";

const { createContext, useEffect } = require("react");

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, loadingUser] = useAuthState(auth);
  const {
    books,
    addBook,
    updateBook,
    fetchBooks,
    removeBook,
    loadingBooks,
    bookCategory,
    categorizeBooksBy,
    categorizedBooks,
  } = useBooks();

  useEffect(() => {
    console.log(user);
    if (!user) return;
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        books,
        addBook,
        updateBook,
        removeBook,
        loading: loadingUser || loadingBooks,
        bookCategory,
        categorizeBooksBy,
        categorizedBooks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
