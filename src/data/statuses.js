import {
  IconFileChart,
  IconFileCheck,
  IconFileInvoice,
} from "@tabler/icons-react";

const statuses = [
  {
    icon: <IconFileCheck />,
    label: "Read",
    value: "Read",
    description: "A book you've completed",
    color: "green",
    ordinal: 3,
  },
  {
    icon: <IconFileInvoice />,
    label: "Unread",
    value: "Unread",
    description: "A book you have yet to read",
    color: "purple",
    ordinal: 2,
  },
  {
    icon: <IconFileChart />,
    label: "Reading",
    value: "Reading",
    description: "A book you're currently reading",
    color: "yellow",
    ordinal: 1,
  },
];

const statusSortingOrder = statuses
  .sort(({ ordinal: a }, { ordinal: b }) => a - b)
  .map(({ label }) => label);

function getStatusByName(statusName) {
  return statuses.find((cat) => cat.label === statusName);
}

export default statuses;
export { getStatusByName, statusSortingOrder };
