import { Button, Flex, Group, Image, Skeleton, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";

export default function ViewBooks({ books }) {
  return (
    <Group>
      {books.map((book) => (
        <Link to={`/books/edit/${book.id}`}>
          <Tooltip label={book.title} position="bottom">
            <Image src={book.image} maw={250} />
          </Tooltip>
        </Link>
      ))}
      <Button component={Link} to="/books/create">
        Add a Book
      </Button>
    </Group>
  );
}
