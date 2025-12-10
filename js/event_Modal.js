const modal = document.querySelector(".scrim");
const btnOpenModal = document.querySelector(".btn_open_modal");
const btnCloseModal = document.querySelector(".btn_close_modal");

/* 모달 팝업*/
btnOpenModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

/* 닫기 버튼을 통한 모달 닫기*/
btnCloseModal.addEventListener("click", () => {
  modal.style.display = "none";
});

/*모달 밖을 클릭 시 모달 닫기*/
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
