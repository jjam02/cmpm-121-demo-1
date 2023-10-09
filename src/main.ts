import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;
let rate: number = 0;
let upgrade1Cost = 10;

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const rateInfo = document.createElement("h2");
rateInfo.innerHTML = `autoclick ⚡${rate}/sec`;
app.append(rateInfo);

const clicker = document.createElement("button");
clicker.innerHTML = "CLICK ON ME PLS ⚡⚡⚡";
clicker.addEventListener("click", () => {
  counter += 1;
  count.innerHTML = `This much power ${counter} ⚡`;
  if (counter >= upgrade1Cost) {
    upgrade1.disabled = false; // Enable the upgrade1 button
  }
});
app.append(clicker);

const upgrade1 = document.createElement("button");
upgrade1.innerHTML = `hamster on wheel (${upgrade1Cost} ⚡) +1 ⚡/sec `;
upgrade1.disabled = true;
upgrade1.addEventListener("click", () => {
  rate += 1;
  counter -= upgrade1Cost;
  upgrade1Cost += 5;
  upgrade1.innerHTML = `hamster on wheel (${upgrade1Cost} ⚡) +1 ⚡/sec `;
  if (counter < upgrade1Cost) {
    upgrade1.disabled = true;
  }

  rateInfo.innerHTML = `autoclick ⚡${rate.toFixed(2)}/sec`;
});

app.append(upgrade1);

const count = document.createElement("div");
count.innerHTML = `This much power ${counter} ⚡`;
app.append(count);

setInterval(upgradeChecker, 500);

function upgradeChecker() {
  if (counter >= upgrade1Cost) {
    upgrade1.disabled = false;
  } else {
    upgrade1.disabled = true;
  }
}
let frameCount = 0;
let lastFrameTime = performance.now();
let frameRate = 60; //min frame rate

function measureFrameRate() {
  const currentTime = performance.now();
  frameCount++;
  counter += rate / frameRate;
  count.innerHTML = `This much power ${counter.toFixed(2)} ⚡`;
  if (currentTime - lastFrameTime >= 1000) {
    frameRate = frameCount;
    frameCount = 0;
    lastFrameTime = currentTime;
  }

  requestAnimationFrame(measureFrameRate);
}

requestAnimationFrame(measureFrameRate);
