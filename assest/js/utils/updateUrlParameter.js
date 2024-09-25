function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  history.pushState(null, "", newUrl);
}

window.addOrUpdateUrlParameter = addOrUpdateUrlParameter;

export default addOrUpdateUrlParameter;
