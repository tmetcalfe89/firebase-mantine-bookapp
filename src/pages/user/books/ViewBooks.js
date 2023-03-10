import { Button, Group, Image, Indicator, Tooltip } from "@mantine/core";
import { getCategoryByName } from "data/categories";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function ViewBooks({ books }) {
  const sortedBooks = useMemo(() => {
    return books.sort(
      (a, b) =>
        getCategoryByName(a.status).ordinal -
        getCategoryByName(b.status).ordinal
    );
  }, [books]);

  return (
    <Group align="flex-end">
      {sortedBooks.map((book) => (
        <Link to={`/books/edit/${book.id}`}>
          <Tooltip label={`${book.title} by ${book.author}`} position="bottom">
            <Indicator color={getCategoryByName(book.status).color}>
              <Image src={book.image} maw={250} />
            </Indicator>
          </Tooltip>
        </Link>
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
    </Group>
  );
}
