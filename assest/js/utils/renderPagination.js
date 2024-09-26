import currentPage from "../category.js";

function renderPagination(totalPages, element, start, end) {
  let html = "";

  if (totalPages < 10) {
    for (let i = 1; i <= totalPages; i++) {
      html += `<a class="page-item " href="#">${i}</a>`;
    }
  } else {
    html = `<a class="page-item ${
      currentPage === 1 ? "active" : ""
    } " href="#">1</a>
          <a class="page-item less-page ${
            currentPage === 2 ? "active" : ""
          } " href="#">${currentPage === totalPages ? "..." : 2}</a>`;
    for (let i = start; i <= end; i++) {
      html += `<a class="page-item" href="#">${i}</a>`;
    }
    html += `
    <a class="page-item more-page " href="#" >${
      currentPage === totalPages ? totalPages - 1 : "..."
    }</a>
        <a class="page-item total-page ${
          currentPage === totalPages ? "active" : ""
        } " href="#">${totalPages}</a>`;
  }
  element.innerHTML = html;
}
// function renderPagination(totalPages, element, start, end) {
//   let html = "";

//   if (totalPages < 10) {
//     for (let i = 1; i <= totalPages; i++) {
//       html += `<a class="page-item " href="#">${i}</a>`;
//     }
//   } else {
//     html = `<a class="page-item ${
//       currentPage === 1 ? "active" : ""
//     } " href="#">1</a>
//           <a class="page-item less-page ${
//             currentPage === 2 ? "active" : ""
//           } " href="#">${currentPage === totalPages ? "..." : 2}</a>`;
//     for (let i = start; i <= end; i++) {
//       html += `<a class="page-item ${
//         currentPage === i ? "active " : ""
//       }" href="#">${i}</a>`;
//     }
//     html += `
//     <a class="page-item more-page " href="#" >${
//       currentPage === totalPages ? totalPages - 1 : "..."
//     }</a>
//         <a class="page-item total-page ${
//           currentPage === totalPages ? "active" : ""
//         } " href="#">${totalPages}</a>`;
//   }
//   element.innerHTML = html;
// }

export default renderPagination;
