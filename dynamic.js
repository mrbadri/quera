/* write your code here ... */

// variables
let en = {},
  fa = {},
  games = {};
// --- DOCUMENT
const $body = document.querySelector("body");
const $name = document.querySelector(".info span");
const $heading = document.querySelector(".info h2");
const $description = document.querySelector(".info p");
const $callToAction = document.querySelector(".info button");
const $cover = document.querySelector(".cover img");
const $changeLanguage = document.querySelector(
  "button[aria-label = 'Change Language']"
);
const $btnsSlider = document.querySelectorAll("nav ul li button");

// functions
async function handler({
  lg = localStorage.getItem("lg") || "en",
  getData = false,
}) {
  const $btnSliderActive = document.querySelector("nav ul li button.active");

  if (getData) await fetchData();

  const dataSliders = convertData({ en, fa, games });
  const dataActiveSlide = handleSlider(dataSliders, $btnSliderActive);

  handleDirection(lg);
  handleStyles(dataActiveSlide);
  fillContent(dataActiveSlide, lg);
}

async function fetchData() {
  await fetch("./languages/en.json")
    .then((x) => x.json())
    .then((data) => (en = data));

  await fetch("./languages/fa.json")
    .then((x) => x.json())
    .then((data) => (fa = data));

  await fetch("./data/games.json")
    .then((x) => x.json())
    .then((data) => (games = data));
}

function convertData({ en, fa, games }) {
  let data = [];

  for (let i = 0; i < en.GAMES.length; i++) {
    data.push({
      callToAction: {
        en: en.GENERAL.CALL_TO_ACTION,
        fa: fa.GENERAL.CALL_TO_ACTION,
      },
      heading: { en: en.GAMES[i].HEADING, fa: fa.GAMES[i].HEADING },
      description: { en: en.GAMES[i].DESCRIPTION, fa: fa.GAMES[i].DESCRIPTION },
      name: { en: games[i].name, fa: games[i].name },
      styles: {
        cover: {
          image: games[i].image,
        },
        callToActionButton: {
          backgroundColor: games[i].callToActionButton.backgroundColor,
          color: games[i].callToActionButton.color,
        },
      },
    });
  }

  return data;
}

function handleSlider(data, $btn) {
  let numberActiveSlide = Number($btn.innerHTML.trim()[1]);

  return data[numberActiveSlide - 1];
}

function fillContent(data, lg) {
  $heading.innerHTML = data.heading[lg];
  $description.innerHTML = data.description[lg];
  $callToAction.innerHTML = data.callToAction[lg];
  $name.innerHTML = data.name[lg];
}

function handleStyles(data) {
  const styleCallToAction = data.styles.callToActionButton;

  $callToAction.style.backgroundColor = styleCallToAction.backgroundColor;
  $callToAction.style.color = styleCallToAction.color;
  $cover.src = data.styles.cover.image;
}

function handleDirection(lg) {
  if (lg === "fa") {
    $body.style.direction = "rtl";
  } else {
    $body.style.direction = "ltr";
  }
}

// events
$changeLanguage.addEventListener("click", (e) => {
  let lg = localStorage.getItem("lg");

  if (lg === "fa") lg = "en";
  else lg = "fa";

  localStorage.setItem("lg", lg);

  handler({ lg });
});

$btnsSlider.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    $btnsSlider.forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");

    handler({});
  });
});

// RUN
handler({ getData: true });
