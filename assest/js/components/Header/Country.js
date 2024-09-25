const Country = (data) => {
  return data
    .map(
      (item) => `
             <li><a href="category.html" onclick="handleChangePage(event)"
                                        link-api="https://phimapi.com/v1/api/quoc-gia/${item?.slug}">${item?.name}</a>
                                </li>
        `
    )
    .join("");
};

export default Country;
