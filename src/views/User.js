import { Stack } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import SideNavButton from "components/SideNavButton";
import UserAppPage from "features/UserAppPage";
import useFirestore from "hooks/useFirestore";
import CreateBook from "pages/user/books/CreateBook";
import ViewBooks from "pages/user/books/ViewBooks";
import EditBook from "pages/user/books/EditBook";

export default function User({ user }) {
  const [
    books,
    { add: addBook, updateEntry: updateBook, removeById: removeBook, loading },
  ] = useFirestore("books");

  return (
    <UserAppPage
      user={user}
      sideNav={<SideNav books={books} />}
      loading={loading}
    >
      <Routes>
        <Route path="/books" element={<ViewBooks books={books} />} />
        <Route
          path="/books/create"
          element={<CreateBook onCreate={addBook} />}
        />
        <Route
          path="/books/edit/:bookId"
          element={
            <EditBook books={books} onSave={updateBook} onRemove={removeBook} />
          }
        />
      </Routes>
    </UserAppPage>
  );
}

function SideNav() {
  return (
    <Navbar>
      <Navbar.Section grow={1}>
        <Stack spacing={0}>
          <SideNavButton to="/books">Your Library</SideNavButton>
          <SideNavButton to="/books/create">Add a Book</SideNavButton>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
