import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;
let rate: number = 0;
let upgrade1Cost: number = 10;
let upgrade1Owned: number = 0;
let upgrade2Cost: number = 100;
let upgrade2Owned: number = 0;
let upgrade3Cost: number = 1000;
let upgrade3Owned: number = 0;

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
upgrade1.innerHTML = `hamster on wheel (${upgrade1Cost.toFixed(
  2,
)} ⚡) +1 ⚡/sec `;
upgrade1.disabled = true;
upgrade1.addEventListener("click", () => {
  upgrade1Owned += 1;
  const upgrade1Data: HTMLTableRowElement = document.getElementById(
    "upgrade1Row",
  ) as HTMLTableRowElement;
  upgrade1Data.cells[1].textContent = `${upgrade1Owned}`;
  rate += 0.1;
  counter -= upgrade1Cost;
  upgrade1Cost *= 1.15;
  upgrade1.innerHTML = `hamster on wheel (${upgrade1Cost.toFixed(
    2,
  )} ⚡) +0.1 ⚡/sec `;
  if (counter < upgrade1Cost) {
    upgrade1.disabled = true;
  }

  rateInfo.innerHTML = `autoclick ⚡${rate.toFixed(2)}/sec`;
});

app.append(upgrade1);

const upgrade2 = document.createElement("button");
upgrade2.innerHTML = `coal miner (${upgrade2Cost} ⚡) +2 ⚡/sec `;
upgrade2.disabled = true;
upgrade2.addEventListener("click", () => {
  upgrade2Owned += 1;
  const upgrade2Data: HTMLTableRowElement = document.getElementById(
    "upgrade2Row",
  ) as HTMLTableRowElement;
  upgrade2Data.cells[1].textContent = `${upgrade2Owned}`;
  rate += 2;
  counter -= upgrade2Cost;
  upgrade2Cost *= 1.3;
  upgrade2.innerHTML = `coal miner (${upgrade2Cost.toFixed(2)} ⚡) +2 ⚡/sec `;
  if (counter < upgrade2Cost) {
    upgrade2.disabled = true;
  }

  rateInfo.innerHTML = `autoclick ⚡${rate.toFixed(2)}/sec`;
});
app.append(upgrade2);

const upgrade3 = document.createElement("button");
upgrade3.innerHTML = `wind turbine (${upgrade3Cost.toFixed(2)} ⚡) +50 ⚡/sec `;
upgrade3.disabled = true;
upgrade3.addEventListener("click", () => {
  upgrade3Owned += 1;
  const upgrade3Data: HTMLTableRowElement = document.getElementById(
    "upgrade2Row",
  ) as HTMLTableRowElement;
  upgrade3Data.cells[1].textContent = `${upgrade3Owned}`;
  rate += 50;
  counter -= upgrade3Cost;
  upgrade3Cost *= 1.57;
  upgrade3.innerHTML = `wind turbine (${upgrade3Cost.toFixed(
    2,
  )} ⚡) +50 ⚡/sec `;
  if (counter < upgrade3Cost) {
    upgrade3.disabled = true;
  }

  rateInfo.innerHTML = `autoclick ⚡${rate.toFixed(2)}/sec`;
});

app.append(upgrade3);

const count = document.createElement("div");
count.innerHTML = `This much power ${counter} ⚡`;
count.style.fontSize = "50px";
app.append(count);

setInterval(upgradeChecker, 500);

function upgradeChecker() {
  if (counter >= upgrade1Cost) {
    upgrade1.disabled = false;
  } else {
    upgrade1.disabled = true;
  }

  if (counter >= upgrade2Cost) {
    upgrade2.disabled = false;
  } else {
    upgrade2.disabled = true;
  }

  if (counter >= upgrade3Cost) {
    upgrade3.disabled = false;
  } else {
    upgrade3.disabled = true;
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
