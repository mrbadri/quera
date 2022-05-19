/* write your code here ... */
// variables
const $body = document.querySelector("body");
const bodywidth = $body.offsetWidth;
const $crosshair = document.querySelector(".crosshair");
const $pistol = document.querySelector(".pistol img");

// Events
document.addEventListener("mousemove", (e) => {
  const rotate = HandleRotate({ x: e.screenX, y: e.screenY });

  // Hanlde position crosshair
  $crosshair.style.setProperty("--x", `${e.pageX}px`);
  $crosshair.style.setProperty("--y", `${e.pageY}px`);

  // Handle pistol
  $pistol.style.transform = `rotate(${rotate}deg)`;
  console.log(rotate);
});

function HandleRotate({ x, y }) {
  const rotateRad = Math.atan(y / x);
  const rotateDeg = (rotateRad * 180) / Math.PI;

  return -Number(rotateDeg);
}
