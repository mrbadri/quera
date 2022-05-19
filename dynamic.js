/* write your code here ... */
const $keys = document.querySelectorAll(".key");

// events
window.addEventListener("keydown", (e) => {
  const input = e.key.toLowerCase();
  const location = e.location;

  handler({ $keys, input, type: "keydown", location });
});

window.addEventListener("keyup", (e) => {
  const input = e.key.toLowerCase();
  const location = e.location;

  handler({ $keys, input, type: "keyup", location });
});

// functions
function handler({ $keys, input, type, location } = {}) {
  $keys.forEach(($key) => {
    const keyValue = $key.innerText.trim().toLowerCase();

    if (keyValue === input) {
      handleClass($key, type);
    }

    // keys on left keyboard
    if (location == 1) {
      // L Shift
      if (keyValue === `l ${input}`) {
        handleClass($key, type);
      }

      // L Ctrl
      if (keyValue === "l ctrl" && input === "control") {
        handleClass($key, type);
      }
    }

    // keys on right keyboard
    if (location == 2) {
      // R Shift
      if (keyValue === `r ${input}`) {
        handleClass($key, type);
      }

      // R Ctrl
      if (keyValue === "r ctrl" && input === "control") {
        handleClass($key, type);
      }
    }

    // special keys
    if ($key.classList.contains("key--special")) {
      // Caps Lock
      if (input === "capslock" && keyValue === "caps lock") {
        handleClass($key, type);
      }

      // Backspace or ⟵
      if (input === "backspace" && keyValue === "⟵") {
        handleClass($key, type);
      }

      // Space
      if (input === " " && keyValue === "") {
        handleClass($key, type);
      }
    }
  });
}

// --- Handle Add and Remove class
function handleClass($element, type) {
  // on key down
  if (type === "keydown") {
    $element.classList.add("key--held");
    $element.classList.remove("key--selected");
  }
  // on key up
  else if (type === "keyup") {
    $element.classList.add("key--selected");
    $element.classList.remove("key--held");
  }
}
