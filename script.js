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
  const topPoint = document.createElement("div");
  topPoint.setAttribute("id", "middleFrame");
  document.querySelector("#dragonPart").appendChild(topPoint);

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
    target.classList.add("glow");
    console.log(features[feature]);

    const newPic = document.createElement("img");
    newPic.src = `images/${feature}.png`;
    newPic.classList.add(`${feature}X`);
    newPic.style.position = "absolute";
    document.querySelector("body").appendChild(newPic);

    const firstFrame = document
      .querySelector("#middleFrame")
      .getBoundingClientRect();

    console.log("First frame to middle", firstFrame);

    const lastFrame = target.getBoundingClientRect();
    console.log("Last frame to middle", lastFrame);

    newPic.style.left = `${lastFrame.left}px`;
    newPic.style.top = `${lastFrame.top}px`;
    newPic.style.width = `${lastFrame.width}px`;
    newPic.style.height = `${lastFrame.height}px`;

    console.log("newPic", newPic);

    const deltaX = firstFrame.left - lastFrame.left - 20;
    const deltaY = firstFrame.top - lastFrame.top - 30;

    const beginningAnime = newPic.animate(
      [
        { transformOrigin: "top left", transform: "none" },
        {
          transformOrigin: "top left",
          transform: `translateX(${deltaX}px)
      translateY(${deltaY}pX)`,
        },
      ],
      {
        duration: 900,
        easing: "ease-in",
      }
    );

    beginningAnime.onfinish = function () {
      document
        .querySelector(`[data-feature='${feature}'`)
        .classList.remove("hide");

      const firstFrame = document
        .querySelector(`[data-feature='${feature}'`)
        .getBoundingClientRect();
      if (feature === "saddle") {
        firstFrame.x = 220;
        firstFrame.y = 230;
      }
      console.log("First frame", firstFrame);

      const lastFrame = document
        .querySelector("#middleFrame")
        .getBoundingClientRect();
      console.log("Last frame", lastFrame);

      newPic.style.left = `${lastFrame.left - 20}px`;
      newPic.style.top = `${lastFrame.top - 30}px`;
      newPic.style.width = `${lastFrame.width}px`;
      newPic.style.height = `${lastFrame.height}px`;

      console.log("newPic", newPic);

      const deltaX = firstFrame.left - lastFrame.left + 40;
      const deltaY = firstFrame.top - lastFrame.top + 70;

      document
        .querySelector(`[data-feature='${feature}'`)
        .classList.add("hide");

      const endAnime = newPic.animate(
        [
          { transformOrigin: "top left", transform: "none" },
          {
            transformOrigin: "top left",
            transform: `translateX(${deltaX}px)
      translateY(${deltaY}pX)`,
          },
        ],
        {
          duration: 200,
          easing: "ease-out",
        }
      );

      endAnime.onfinish = function () {
        document
          .querySelector(`[data-feature='${feature}'`)
          .classList.remove("hide");
        document.querySelector("body").removeChild(newPic);
      };
    };
  } else {
    features[feature] = false;
    target.classList.remove("chosen");
    target.classList.remove("glow");
    document.querySelector(`[data-feature='${feature}'`).classList.add("hide");
  }
}
