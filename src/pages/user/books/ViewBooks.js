import {
  Button,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import Indicator from "components/Indicator";
import { UserContext } from "context/UserContext";
import sortCategories from "data/sortCategories";
import { getStatusByName } from "data/statuses";
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { capitalizeWords } from "util/stringUtil";
import { createUrl } from "util/urlUtil";

const categories = Object.entries(sortCategories).map(
  ([name, { prettyName }]) => ({
    label: prettyName || capitalizeWords(name),
    value: name,
  })
);

export default function ViewBooks() {
  const { books, categorizeBooksBy, bookCategory, categorizedBooks } =
    useContext(UserContext);

  const sortedBooks = useMemo(() => {
    return books.sort(
      (a, b) =>
        getStatusByName(a.status).ordinal - getStatusByName(b.status).ordinal
    );
  }, [books]);

  const sortedCategoryList = useMemo(() => {
    if (!bookCategory) return null;
    return (
      sortCategories[bookCategory].sortOrder ||
      [...new Set(books.map((book) => book[bookCategory]))].sort()
    );
  }, [bookCategory, books]);

  return (
    <Stack>
      <Group>
        <Text>Group books by:</Text>
        <Select
          data={[{ label: "No Sorting", value: null }, ...categories]}
          onChange={categorizeBooksBy}
          value={bookCategory}
        />
      </Group>
      <Group align="flex-end">
        {bookCategory ? (
          <Stack>
            {sortedCategoryList.map((categoryName) => (
              <Stack>
                <Group>
                  <Title>
                    {categoryName} (
                    {categorizedBooks[categoryName]?.length || "None"})
                  </Title>
                  <Tooltip label={`Add a book in ${categoryName}`}>
                    <Button
                      component={Link}
                      to={createUrl("/books/create", {
                        query: {
                          [bookCategory]: categoryName,
                        },
                      })}
                    >
                      Add a Book
                    </Button>
                  </Tooltip>
                </Group>
                <Group>
                  {categorizedBooks[categoryName]?.map((book) => (
                    <BookCard {...book} key={book.id} />
                  )) || (
                    <Text>
                      No books in this category yet. Add one with the button
                      next to the category name.
                    </Text>
                  )}
                </Group>
              </Stack>
            ))}
          </Stack>
        ) : (
          <>
            {sortedBooks.map((book) => (
              <BookCard {...book} key={book.id} />
            ))}
            <Button
              component={Link}
              to="/books/create"
              style={{
                alignSelf: "stretch",
                height: "initial",
                minHeight: "2.25rem",
              }}
            >
              Add a Book
            </Button>
          </>
        )}
        {/*  */}
      </Group>
    </Stack>
  );
}

function BookCard({ id, title, author, status, image }) {
  return (
    <Link to={`/books/edit/${id}`}>
      <Tooltip label={`${title} by ${author}`} position="bottom">
        <Indicator color={getStatusByName(status).color}>
          {image ? (
            <Image src={image} width={125} />
          ) : (
            <svg
              width="125"
              height="225"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 125 225"
              preserveAspectRatio="none"
            >
              <g id="holder">
                <rect width="100%" height="100%" fill="#cccccc"></rect>
                <g>
                  <text text-anchor="middle" x="50%" y="50%" dy=".3em">
                    {title}
                  </text>
                </g>
              </g>
            </svg>
          )}
        </Indicator>
      </Tooltip>
    </Link>
  );
}
