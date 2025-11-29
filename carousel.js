/* ——————————————————————————————
   RESPONSIVE INFINITE SCROLL LOGIC
—————————————————————————————— */

const defaultItemCount = 7;
const itemWidth = 238;

const wrapper = document.getElementById("InfiniteScrollWrapper");
const content = document.getElementById("InfiniteScroll");

function manageChildren(groupCount) {

  // Remove existing clones
  while (content.children.length > defaultItemCount) {
    content.removeChild(content.lastChild);
  }

  // Duplicate items for smooth infinite scroll
  for (let i = 0; i < groupCount; i++) {
    for (let j = 0; j < defaultItemCount; j++) {
      const clone = content.children[j].cloneNode(true);
      content.appendChild(clone);
    }
  }

  // Set total width
  content.style.width =
    `${itemWidth * defaultItemCount * (groupCount + 1)}px`;
}

function determineCloneCount(width) {
  if (width <= 1920)      manageChildren(2);
  else if (width <= 2560) manageChildren(3);
  else if (width <= 3840) manageChildren(4);
  else                    manageChildren(8);
}

// Debounce resize listener
function debounce(func, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
}

const handleResize = debounce(
  () => determineCloneCount(window.innerWidth),
  300
);

// Init
window.addEventListener("load", () => {
  determineCloneCount(window.innerWidth);
});

window.addEventListener("resize", handleResize);