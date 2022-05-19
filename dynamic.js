/* write your code here ... */
// variables
const $crosshair = document.querySelector(".crosshair");

// Events
document.addEventListener("mousemove", (e) => {
  $crosshair.style.setProperty("--x", `${e.pageX}px`);
  $crosshair.style.setProperty("--y", `${e.pageY}px`);
});
