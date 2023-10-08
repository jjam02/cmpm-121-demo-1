import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;
//let lastTimestamp: number = 0;
const rate: number = 1;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const clicker = document.createElement("button");
clicker.innerHTML = "CLICK ON ME PLS ⚡⚡⚡";
clicker.addEventListener("click", () => {
  counter += 1;
  count.innerHTML = `This much power ${counter} ⚡`;
});
app.append(clicker);

const count = document.createElement("div");
count.innerHTML = `This much power ${counter} ⚡`;
app.append(count);

// setInterval(counterHelper, 1000);

// function counterHelper() {
//   counter += rate;
//   counter = parseFloat(counter.toFixed(1));
//   count.innerHTML = `This much power ${counter} ⚡`;
// }
let frameCount = 0;
let lastFrameTime = 0;

function measureFrameRate() {
  const currentTime = performance.now();
  //console.log(currentTime,"this is the time");
  frameCount++;

  if (currentTime - lastFrameTime >= 1000) {
    // Calculate frame rate every second
    const frameRate = frameCount;
    console.log(`Frame Rate: ${frameRate} FPS`);
    counter += rate / frameRate;
    count.innerHTML = `This much power ${counter.toFixed(2)} ⚡`;
    frameCount = 0;
    lastFrameTime = currentTime;
  }

  requestAnimationFrame(measureFrameRate);
}

requestAnimationFrame(measureFrameRate);
