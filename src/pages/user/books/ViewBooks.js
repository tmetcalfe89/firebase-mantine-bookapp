import { Button, Flex, Group, Image, Skeleton, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";

export default function ViewBooks({ books }) {
  return (
    <Group align="flex-end">
      {books.map((book) => (
        <Link to={`/books/edit/${book.id}`}>
          <Tooltip label={`${book.title} by ${book.author}`} position="bottom">
            <Image src={book.image} maw={250} />
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
