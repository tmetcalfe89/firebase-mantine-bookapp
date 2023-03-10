import { Stack } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import SideNavButton from "components/SideNavButton";
import UserAppPage from "features/UserAppPage";
import CreateBook from "pages/user/books/CreateBook";
import ViewBooks from "pages/user/books/ViewBooks";
import EditBook from "pages/user/books/EditBook";
import { useContext } from "react";
import { UserContext } from "context/UserContext";

export default function User() {
  const { user, books, loading, addBook, updateBook, removeBook } =
    useContext(UserContext);

  return (
    <UserAppPage
      user={user}
      sideNav={<SideNav books={books} />}
      loading={loading}
    >
      <Routes>
        <Route path="/" element={<ViewBooks books={books} />} />
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
    <Stack spacing={0}>
      <SideNavButton to="/books">Your Library</SideNavButton>
      <SideNavButton to="/books/create">Add a Book</SideNavButton>
    </Stack>
  );
}
