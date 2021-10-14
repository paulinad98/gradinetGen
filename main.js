const angleInput = document.getElementById("angle");
const angleDisplay = document.getElementById("angle-display");
const angleInputLabels = document.querySelectorAll(".angle");
const backgroundGradientGrid = document.getElementById("gradient");
const supriseBtn = document.getElementById("suprise");
const colorCounter = document.getElementById("count-color");
const colorsContainer = document.getElementById("colors");
const copyCode = document.getElementById("copy-code");
const radialBtn = document.getElementById("radial");
const linearBtn = document.getElementById("linear");
const body = document.querySelector("body");
const angleWrapper = document.querySelector(".angle-wrapper");
let colorPercent, gradientAngle, colorInputs, splitersContainer;
let gradientMode = "linear";
let arrOfColors = [];
let arrOfSplitters = [];
let numberOfColors = 2;

//start display
setColor();
createColorInputs();
setGradient();

supriseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  numberOfColors = 2;
  colorCounter.value = numberOfColors;
  setColor();
  createColorInputs();
  for (let i = 0; i < numberOfColors; i++) {
    colorInputs[i].value = randomColor();
    splitersContainer[i].value = Math.floor(
      Math.random() * 100 + splitersContainer[i].value
    );
  }
  angleInput.value = Math.floor(Math.random() * 360);
  setGradient();
});

colorCounter.addEventListener("input", () => {
  if (numberOfColors > 1) {
    numberOfColors = colorCounter.value;
  } else {
    numberOfColors = 2;
  }
  setColor();
  createColorInputs();
  setGradient();
});

radialBtn.addEventListener("click", () => {
  if (!radialBtn.classList.contains("clicked")) {
    radialBtn.classList.add("clicked");
    linearBtn.classList.remove("clicked");
    gradientMode = "radial";
    angleWrapper.style.visibility = "hidden";
    setGradient();
  }
});

linearBtn.addEventListener("click", () => {
  if (!linearBtn.classList.contains("clicked")) {
    linearBtn.classList.add("clicked");
    radialBtn.classList.remove("clicked");
    gradientMode = "linear";
    angleWrapper.style.visibility = "visible";
    setGradient();
  }
});

angleInput.addEventListener("input", (e) => {
  angleDisplay.innerText = `${e.target.value}°`;
  setGradient();
});

function setGradient() {
  arrOfColors = [];
  for (let i = 0; i < numberOfColors; i++) {
    arrOfColors[i] = colorInputs[i].value;
    arrOfSplitters[i] = splitersContainer[i].value;
  }
  gradientAngle = angleInput.value;
  doGradient();
}

function doGradient() {
  let gradientText = "";
  for (let i = 0; i < numberOfColors; i++) {
    gradientText += `,${arrOfColors[i]} ${arrOfSplitters[i]}%`;
  }

  if (gradientMode === "linear") {
    body.style.background = `${gradientMode}-gradient(${gradientAngle}deg ${gradientText})`;
  } else {
    body.style.background = `${gradientMode}-gradient(circle ${gradientText})`;
  }
  copyCode.textContent = `background: ${body.style.background}`;
}

function setColor() {
  for (let i = 0; i < numberOfColors; i++) {
    arrOfColors.push(randomColor());
  }
}

function createColorHTML(colorNumber) {
  return `<div>
                <label for="picker-${colorNumber}">Color ${colorNumber}:</label>
                <input id="picker-${colorNumber}" type="color" name="color-${colorNumber}" value="${
    arrOfColors[colorNumber - 1]
  }" class="color"/>
                <label for="split-${colorNumber}">Split:</label>
                <input id="split-${colorNumber}" type="range" name="split-${colorNumber}"  value="${
    (100 / arrOfColors.length) * colorNumber
  }" min="0" max="100" class="spliter"/>
        </div>`;
}

function createColorInputs() {
  colorsContainer.innerHTML = "";
  for (let i = 0; i < numberOfColors; i++) {
    colorsContainer.innerHTML += createColorHTML(i + 1);
  }
  colorInputs = document.querySelectorAll(".color");
  splitersContainer = document.querySelectorAll(".spliter");
  colorInputs.forEach((obj) => obj.addEventListener("input", setGradient));
  splitersContainer.forEach((obj) =>
    obj.addEventListener("input", setGradient)
  );
}

function randomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}
