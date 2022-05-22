/* write your code here ... */
// variables
const $body = document.querySelector("body");
const bodywidth = $body.offsetWidth;
const $crosshair = document.querySelector(".crosshair");
const $pistol = document.querySelector(".pistol img");

// Events
document.addEventListener("mousemove", (e) => {
  // Hanlde position crosshair
  $crosshair.style.setProperty("--x", `${e.pageX}px`);
  $crosshair.style.setProperty("--y", `${e.pageY}px`);

  // Handle pistol
  const { x, y } = $pistol.getBoundingClientRect();

  const rotate = HandleRotate({ x: e.pageX - x, y: e.pageY - y });
  $pistol.style.transform = `rotate(${rotate}deg)`;
  // console.log("rotate:", rotate);
});

function HandleRotate({ x, y }) {
  let rotateRad = Math.atan2(y, x);
  let rotateDeg = (rotateRad * 180) / Math.PI;

  return Number(rotateDeg);
}
