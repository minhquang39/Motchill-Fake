function handleMultiTab(name, content) {
  const tabNames = document.querySelectorAll(name);
  const tabContents = document.querySelectorAll(content);
  tabNames.forEach((tabName, index) => {
    tabName.onclick = function (e) {
      document.querySelector(`${name}.active`).classList.remove("active");
      tabNames[index].classList.add("active");

      document.querySelector(`${content}.active`).classList.remove("active");
      tabContents[index].classList.add("active");
    };
  });
}

window.handleMultiTab = handleMultiTab;

export default handleMultiTab;
