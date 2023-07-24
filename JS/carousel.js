let prevButton = $(".prev");
let nextButton = $(".next");
let carousel = $(".carousel");

let index = 0;

$(prevButton).on("click", () => {
  if (index === 0) return;
  index -= 1;
  carousel[0].style.transform = `translate3d(-${100 * index}vw,0,0)`;
});
$(nextButton).on("click", () => {
  if (index === 2) return;
  index += 1;
  carousel[0].style.transform = `translate3d(-${100 * index}vw,0,0)`;
});
