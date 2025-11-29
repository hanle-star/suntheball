const paintWindow = document.getElementById("paint-window");
const titleBar = document.getElementById("title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - paintWindow.offsetLeft;
  offsetY = e.clientY - paintWindow.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  paintWindow.style.left = e.clientX - offsetX + "px";
  paintWindow.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
