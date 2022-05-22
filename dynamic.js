/* write your code here ... */
// variables
const $body = document.querySelector("body");
const $crosshair = document.querySelector(".crosshair");
const $Pistol = document.querySelector(".pistol");

$body.style.overflow = "hidden";

// Events
// --- on mouse move
document.addEventListener("mousemove", (e) => {
  // Hanlde position crosshair
  $crosshair.style.setProperty("--x", `${e.pageX}px`);
  $crosshair.style.setProperty("--y", `${e.pageY}px`);

  // Handle pistol
  const { x, y } = $Pistol.getBoundingClientRect();
  const rotate = handleRotate({ x: e.pageX - x, y: e.pageY - y });

  $Pistol.style.transform = `rotate(${rotate}deg)`;
});

// --- on click
document.addEventListener("click", (e) => {
  if (fireAccess(e.target)) {
    const $bullet = createBullet();
    let positionX = 0;

    $Pistol.appendChild($bullet);

    setInterval(function () {
      positionX++;
      $bullet.style.transform = `translate(${positionX}px `;
    }, 4);

    setTimeout(() => {
      $bullet.remove();
    }, 2000);
  }
});

// functions
function handleRotate({ x, y }) {
  let rotateRad = Math.atan2(y, x);
  let rotateDeg = (rotateRad * 180) / Math.PI;

  return Number(rotateDeg);
}

function handleSlopeMove({ input, x, y }) {
  return (y / x) * input;
}

function fireAccess($target) {
  return !$target.classList.contains("death-zone");
}

function createBullet() {
  const $bullet = document.createElement("img");
  $bullet.classList.add("bullet");
  $bullet.src = "/illustrations/bullet.svg";

  return $bullet;
}
