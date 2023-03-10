const { statusSortingOrder } = require("./statuses");

const sortCategories = {
  author: {},
  status: {
    sortOrder: statusSortingOrder,
  },
};

export default sortCategories;
