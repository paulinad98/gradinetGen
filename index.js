const angleInput = document.getElementById("angle");
const angleInputs = document.querySelectorAll(".angle");
const backgroundGradient = document.getElementById("gradient");
const supriseBtn = document.getElementById("suprise");
const colorCounter = document.getElementById("count-color");
const colorsContainer = document.getElementById("colors");
const generateBtn = document.getElementById("gen");
const copyCode = document.getElementById("copy-code");
const radialBtn = document.querySelector(".radial");
let colorPercent, gradientAngle, colors, splitersContainer;
let gradientMode = "linear";
let arrOfColors = [];
let arrOfSplitters = [];
let howManyColors = 2;

setColor();
createColorInputs();
setGradient();

function doGradient() {
  let gradientText = "";
  for (let i = 0; i < howManyColors; i++) {
    gradientText += `,${arrOfColors[i]} ${arrOfSplitters[i]}%`;
  }

  if (gradientMode === "linear") {
    backgroundGradient.style.background = `${gradientMode}-gradient(${gradientAngle}deg ${gradientText})`;
  } else {
    backgroundGradient.style.background = `${gradientMode}-gradient(circle ${gradientText})`;
  }
  copyCode.textContent = `background: ${backgroundGradient.style.background}`;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function setColor() {
  for (let i = 0; i < howManyColors; i++) {
    arrOfColors.push(randomColor());
  }
}

function colorDiv(numberOfColor) {
  return `<div>
                <label for="picker-${numberOfColor}">Color ${numberOfColor}:</label>
                <input id="picker-${numberOfColor}" type="color" name="color-${numberOfColor}" value="${
    arrOfColors[numberOfColor - 1]
  }" class="color"/>
                <label for="split-${numberOfColor}">Split:</label>
                <input value="${
                  100 / numberOfColor
                }%" type="range" id="split-${numberOfColor}" name="split-${numberOfColor}" min="0" max="100" class="spliter"/>
        </div>`;
}

function createColorInputs() {
  colorsContainer.innerHTML = "";
  for (let i = 0; i < howManyColors; i++) {
    colorsContainer.innerHTML += colorDiv(i + 1);
  }
  colors = document.querySelectorAll(".color");
  splitersContainer = document.querySelectorAll(".spliter");
  colors.forEach((obj) => obj.addEventListener("click", setGradient));
  splitersContainer.forEach((obj) =>
    obj.addEventListener("click", setGradient)
  );
}

supriseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  howManyColors = Math.floor(Math.random() * 8 + 2);
  colorCounter.value = howManyColors;
  setColor();
  createColorInputs();
  for (let i = 0; i < howManyColors; i++) {
    colors[i].value = randomColor();
    splitersContainer[i].value = Math.floor(
      Math.random() * 100 + splitersContainer[i].value
    );
  }
  angleInput.value = Math.floor(Math.random() * 360);
  setGradient();
});

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setGradient();
});

colorCounter.addEventListener("change", () => {
  howManyColors = colorCounter.value;
  createColorInputs();
  setColor();
});

radialBtn.addEventListener("click", () => {
  if (!radialBtn.classList.contains("clicked")) {
    radialBtn.classList.add("clicked");
    gradientMode = "linear";
    angleInputs.forEach((obj) => obj.classList.remove("clicked"));
  } else {
    radialBtn.classList.remove("clicked");
    gradientMode = "radial";
    angleInputs.forEach((obj) => obj.classList.add("clicked"));
  }
  setGradient();
});

angleInput.addEventListener("click", setGradient);

function setGradient() {
  arrOfColors = [];
  for (let i = 0; i < howManyColors; i++) {
    arrOfColors[i] = colors[i].value;
    arrOfSplitters[i] = splitersContainer[i].value;
  }
  gradientAngle = angleInput.value;
  doGradient();
}
