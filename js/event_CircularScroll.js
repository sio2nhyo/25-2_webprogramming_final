const items = document.querySelectorAll(".circle [class^='container']");
const total = items.length;
const nameTarget = document.querySelector(".details .name");
const headerTarget = document.querySelector(".details .header");
const introTarget = document.querySelector(".details .introduction");

let spacing = 0;
let currentIndex = 0;
let angleOffset = 0;
let isAnimating = false;

/* 휠 메뉴 전체 */
function apply() {
  items.forEach((item, i) => {
    const angle = angleOffset + i * spacing;
    item.style.transform = `translateY(-50%) rotate(${angle}deg)`;

    /* 휠 메뉴 영역 : 특정 영역에 들어왔을 때 메뉴에 불 들어옴 */
    if (angle > -5 && angle < 5) {
      item.style.color = "#ffffff";
      item.style.opacity = "1";
      item.classList.add("active");

      /* 설명 영역 : 텍스트 정보 교체 */
      const titleData = item.dataset.title;
      const headerData = item.dataset.header;
      const introData = item.dataset.intro;

      if (nameTarget) nameTarget.innerText = titleData || "";
      if (headerTarget) headerTarget.innerText = headerData || "";
      if (introTarget) introTarget.innerText = introData || "";
    } else {
      item.style.color = "#545454";
      item.style.opacity = "0.5";
      item.classList.remove("active");
    }
  });
}

/* 이미지 영역 전체 */
function updateImages() {
  const mainImg = document.getElementById("img_main");
  const prevImg = document.getElementById("img_prev");
  const nextImg = document.getElementById("img_next");

  const backImgTag = document.querySelector(".face.back .backimg");

  /* 현재 기준으로 앞뒤 이미지 번호 매기기 */
  const i = ((currentIndex % total) + total) % total;
  const prevIndex = (i - 1 + total) % total;
  const nextIndex = (i + 1) % total;

  /* 이미지 영역 : 이미지 데이터 불러오기 */
  if (items[i].dataset.img) mainImg.src = items[i].dataset.img;
  if (items[prevIndex].dataset.img) prevImg.src = items[prevIndex].dataset.img;
  if (items[nextIndex].dataset.img) nextImg.src = items[nextIndex].dataset.img;

  if (backImgTag) {
    backImgTag.src = items[i].dataset.backimg || "";
  }
}

apply();
updateImages();

/* 애니메이션 : 페이지 새로고침 시 메뉴 펼쳐짐 */
setTimeout(() => {
  spacing = 15;
  apply();
}, 500);

let scrollAccumulator = 0;
const scrollThreshold = 100;

window.addEventListener(
  "wheel",
  (e) => {
    if (isAnimating) return;

    scrollAccumulator += e.deltaY;

    if (Math.abs(scrollAccumulator) > scrollThreshold) {
      isAnimating = true;
      const stack = document.querySelector(".wrap_img");

      const animatedElements = document.querySelectorAll(
        ".subimg_prev, .subimg_next, .main_card_perspective"
      );

      /* 애니메이션 : 스크롤 방향 */
      if (scrollAccumulator > 0) {
        currentIndex++;
        stack.classList.add("move-up");
      } else {
        currentIndex--;
        stack.classList.add("move-down");
      }

      angleOffset = -(currentIndex * spacing);
      apply();

      /* 다음 스크롤을 위한 이미지 변경 */
      setTimeout(() => {
        animatedElements.forEach((el) => (el.style.transition = "none"));

        const sideImages = document.querySelectorAll(
          ".subimg_prev, .subimg_next"
        );
        sideImages.forEach((el) => (el.style.opacity = "0"));

        updateImages();
        stack.classList.remove("move-up");
        stack.classList.remove("move-down");

        void stack.offsetWidth;

        setTimeout(() => {
          animatedElements.forEach((el) => (el.style.transition = ""));

          sideImages.forEach((el) => (el.style.opacity = ""));

          isAnimating = false;
          scrollAccumulator = 0;
        }, 0);
      }, 500);
    }
  },
  { passive: true }
);
