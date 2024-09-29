function renderPagination(total, page, element) {
  let html = "";
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    html = `<a class="btn btn-prev" onclick="renderPagination(${total},${
      page - 1
    },${element})"><</a>`;
  }

  for (let pos = beforePage; pos <= afterPage; pos++) {
    html += `<a class="page-item">${pos}</a>`;
  }

  if (page < total) {
    html += `<a class="btn btn-next ">></a>`;
  }

  element.innerHTML = html;
}

// window.renderPagination = renderPagination;
// export default renderPagination;
