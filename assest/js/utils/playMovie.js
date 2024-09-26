function playMovie(e) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  const link = e.target.getAttribute("embed");

  e.target.parentElement.classList.add("active");

  const player = document.querySelector(".player");
  player.src = link;
}

window.playMovie = playMovie;
export default playMovie;
