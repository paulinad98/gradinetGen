const angleInput = document.getElementById("angle");
const angleDisplay = document.getElementById("angle-display");
const angleInputLabels = document.querySelectorAll(".angle");
const backgroundGradientGrid = document.getElementById("gradient");
const supriseBtn = document.getElementById("suprise");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const cssToCopy = document.getElementById("copied");
const colorsContainer = document.getElementById("colors");
const copyCodeBtn = document.getElementById("copy-code");
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

incrementBtn.addEventListener("click", () => {
  numberOfColors++;
  setColor();
  createColorInputs();
  setGradient();
});

decrementBtn.addEventListener("click", () => {
  if (numberOfColors !== 2) {
    numberOfColors--;
    setColor();
    createColorInputs();
    setGradient();
  }
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

copyCodeBtn.addEventListener("click", () => {
  const copyText = cssToCopy;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  copyCodeBtn.classList.add("active");
  setTimeout(() => {
    copyCodeBtn.classList.remove("active");
  }, 1000);
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
  cssToCopy.value = `background: ${body.style.background}`;
}

function setColor() {
  for (let i = 0; i < numberOfColors; i++) {
    arrOfColors.push(randomColor());
  }
}

function createColorHTML(colorNumber) {
  return `<div>
                <input id="picker-${colorNumber}" type="color" name="color-${colorNumber}" value="${
    arrOfColors[colorNumber - 1]
  }" class="color"/>
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
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
