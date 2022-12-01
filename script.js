// query selectors
const body = document.querySelector("body");
const html = document.querySelector("html");
const gallery = document.querySelectorAll(".image-wrapper .column");

const previewBox = document.querySelector(".lightbox-container");
const previewImg = document.querySelector(".lightbox-image");

const lightboxBtns = document.querySelectorAll(".lightbox-btn");
const lightboxBtnRight = document.querySelector("#right");
const lightboxBtnLeft = document.querySelector("#left");

const titles = document.querySelectorAll(".image-wrapper .subtitle");
const lightboxTitle = document.querySelector(".lightbox-title");

// functions

window.onload = () => {
  for (let i = 0; i < gallery.length; i++) {
    let newIndex = i;
    let clickImgindex;
    gallery[i].onclick = () => {
      clickImgindex = newIndex;
      function preview() {
        let selectedImhUrl = gallery[newIndex].querySelector("img").src;
        previewImg.src = selectedImhUrl;
        let selectedTitle = gallery[newIndex].querySelector("h3").textContent;
        lightboxTitle.textContent = selectedTitle;
      }

      const prevBtn = document.querySelector("#left");
      const nextBtn = document.querySelector("#right");
      if (newIndex === 0) {
        //if index value is equal to 0 then hide prevBtn
        prevBtn.classList.add("inactive");
      }
      if (newIndex === gallery.length - 1) {
        //if index value is greater and equal to gallery length by -1 then hide nextBtn
        nextBtn.classList.add("inactive");
      }
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        newIndex--; //decrement index
        if (newIndex == 0) {
          preview();
          prevBtn.classList.add("inactive");
        } else {
          preview();
          nextBtn.classList.remove("inactive");
        }
      };
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        newIndex++; //increment index
        if (newIndex >= gallery.length - 1) {
          preview();
          nextBtn.classList.add("inactive");
        } else {
          preview();
          prevBtn.classList.remove("inactive");
        }
      };

      let touchstartX = 0;
      let touchendX = 0;

      function checkDirection(e) {
        if (touchendX > touchstartX) {
          if (newIndex == 0) {
            newIndex = gallery.length;
            newIndex--;
            preview();
          } else {
            newIndex--;
            preview();
          }
        }
        if (touchendX < touchstartX) {
          if (newIndex == gallery.length - 1) {
            newIndex = -1;
            newIndex++;
            preview();
          } else {
            newIndex++;
            preview();
          }
          console.log(newIndex);
        }
      }

      preview();
      previewBox.classList.add("active");
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";

      previewBox.onclick = () => {
        newIndex = clickImgindex;
        prevBtn.classList.remove("inactive");
        nextBtn.classList.remove("inactive");
        previewBox.classList.remove("active");
        html.style.overflow = "initial";
        body.style.overflow = "initial";
      };
      previewBox.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
      });
      previewBox.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
      });
    };
  }
};
