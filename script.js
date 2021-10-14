let selectedColor = "yellow";
const features = {
  horns: false,
  neckCrystals: false,
  legCrystals: false,
  wingCrystals: false,
  tailCrystals: false,
  saddle: false,
};

document.addEventListener("DOMContentLoaded", start);

async function start() {
  let response = await fetch("theDragon-01.svg");
  let mySvgData = await response.text();
  document.querySelector("#dragonPart").innerHTML = mySvgData;
  document
    .querySelectorAll(".feature-option")
    .forEach((option) => option.addEventListener("click", toggleOption));
  init();
}

function setColor(element, color) {
  element.style.fill = color;
}

function init() {
  setColor(document.querySelector("#body"), "grey");
  setColor(document.querySelector("#wings"), "grey");
  setColor(document.querySelector("#eye"), "grey");

  document.querySelector("#body").addEventListener("click", (event) => {
    setColor(document.querySelector("#body"), selectedColor);
  });

  document.querySelector("#wings").addEventListener("click", (event) => {
    setColor(document.querySelector("#wings"), selectedColor);
  });

  document.querySelector("#eye").addEventListener("click", (event) => {
    setColor(event.target, selectedColor);
  });

  document.querySelector("#colorWheel").addEventListener("input", (event) => {
    selectedColor = event.target.value;
    console.log(selectedColor);
  });

  document.querySelectorAll(".dragon-color").forEach((elm) => {
    elm.addEventListener("click", (event) => {
      selectedColor = event.target.style.backgroundColor;
      console.log(event.target.style.backgroundColor);
      console.log(selectedColor);
    });
  });
}

function toggleOption(event) {
  const target = event.currentTarget;

  const feature = target.dataset.feature;

  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  if (features[feature]) {
    target.classList.add("chosen");
    console.log(features[feature]);

    const newPic = document.createElement("img");
    newPic.src = `images/${feature}.png`;
    newPic.classList.add(`${feature}X`);
    document.querySelector(`.${feature}`).appendChild(newPic);

    document
      .querySelector(`[data-feature='${feature}'`)
      .classList.remove("hide");

    const firstFrame = document
      .querySelector(`[data-feature='${feature}'`)
      .getBoundingClientRect();
    console.log(firstFrame);

    const lastFrame = target.getBoundingClientRect();
    console.log(lastFrame);

    const deltaX = firstFrame.left - lastFrame.left;
    const deltaY = firstFrame.top - lastFrame.top;
    /*const deltaWidth = firstFrame.width / lastFrame.width;
    const deltaHeight = firstFrame.height / lastFrame.height;*/

    document.querySelector(`[data-feature='${feature}'`).classList.add("hide");

    const picAnime = newPic.animate(
      [
        {
          transformOrigin: "top left",
          transform: `translateX(${deltaX}px)
      translateY(${deltaY}px)`,
        },
        { transformOrigin: "top left", transform: "none" },
      ],
      {
        duration: 600,
        easing: "ease-in-out",
      }
    );

    picAnime.onfinish = function () {
      document
        .querySelector(`[data-feature='${feature}'`)
        .classList.remove("hide");
      document.querySelector(`.${feature}`).removeChild(newPic);
    };
  } else {
    features[feature] = false;
    target.classList.remove("chosen");
    document.querySelector(`[data-feature='${feature}'`).classList.add("hide");
  }
}
