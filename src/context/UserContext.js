import { auth } from "api/firebase";
import useFirestore from "hooks/useFirestore";
import { useAuthState } from "react-firebase-hooks/auth";

const { createContext, useEffect } = require("react");

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, loadingUser] = useAuthState(auth);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
