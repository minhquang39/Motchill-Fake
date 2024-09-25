function handleMultiTab(tabNames, tabContents) {
  tabNames.forEach((tabName, index) => {
    tabName.onclick = function (e) {
      document
        .querySelector(".tab_category_title.active")
        .classList.remove("active");
      tabNames[index].classList.add("active");

      document
        .querySelector(".tab_category_content.active")
        .classList.remove("active");
      tabContents[index].classList.add("active");
    };
  });
}

window.handleMultiTab = handleMultiTab;

export default handleMultiTab;
