window.addEventListener("load", () => {
  const introLayer = document.querySelector(".intro_layer");

  if (introLayer) {
    introLayer.addEventListener("click", () => {
      introLayer.classList.add("fade-out");

      document.body.classList.add("start-active");

      setTimeout(() => {
        introLayer.style.display = "none";
        introLayer.remove();
      }, 1000);
    });
  }
});
