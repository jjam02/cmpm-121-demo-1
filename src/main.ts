import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;
let rate: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  own: number;
  button: HTMLButtonElement;
  emoji: string;
}

const availableItems: Item[] = [
  {
    name: "hamster on wheel",
    cost: 10,
    rate: 0.1,
    own: 0,
    button: document.createElement("button"),
    emoji: "🐹🎡",
  },
  {
    name: "coal miner",
    cost: 100,
    rate: 1,
    own: 0,
    button: document.createElement("button"),
    emoji: "🕺⛏",
  },
  {
    name: "wind turbine",
    cost: 1000,
    rate: 50,
    own: 0,
    button: document.createElement("button"),
    emoji: "🌬️🌾🏭",
  },
];

function updateGlobalRate(upgrade: Item): void {
  rate += upgrade.rate;
  rateInfo.innerHTML = `autoclick ⚡${rate.toFixed(2)}/sec`;
}

function updateCounter(upgrade: Item) {
  counter -= upgrade.cost;
  count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
}

function setUpgradeText(upgrade: Item): void {
  upgrade.button.innerHTML = `${upgrade.name} ${
    upgrade.emoji
  } </br> (${upgrade.cost.toFixed(2)} ⚡)| +${upgrade.rate} ⚡/sec`;
}

function setUpgradeTable(upgrade: Item): void {
  const row = document.getElementById(
    `${upgrade.name} row`,
  ) as HTMLTableRowElement;
  row.cells[1].textContent += `|${upgrade.emoji}`;
}

function updateUpgrade(upgrade: Item): void {
  updateCounter(upgrade);
  upgrade.cost *= 1.15;
  upgrade.own += 1;
  setUpgradeText(upgrade);
  setUpgradeTable(upgrade);
}

function upgradeSetup(upgrades: Item[]) {
  upgrades.forEach((item) => {
    setUpgradeText(item);
    item.button.disabled = true;
    item.button.addEventListener("click", () => {
      updateUpgrade(item);
      updateGlobalRate(item);
    });
    app.append(item.button);
  });
}

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const rateInfo = document.createElement("h2");
rateInfo.innerHTML = `autoclick ⚡${rate}/sec`;
app.append(rateInfo);

const clicker = document.createElement("button");
clicker.innerHTML = "Generate Electricity ⚡⚡⚡";
clicker.addEventListener("click", () => {
  counter += 1;
  count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
});
app.append(clicker);

upgradeSetup(availableItems);

const count = document.createElement("div");
count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
count.style.fontSize = "50px";
app.append(count);

setInterval(upgradeChecker, 500);

function upgradeChecker(upgrade: Item) {
  if (counter >= upgrade.cost) {
    upgrade.button.disabled = false;
  } else {
    upgrade.button.disabled = true;
  }
}
let frameCount = 0;
let lastFrameTime = performance.now();
let frameRate = 60; //min frame rate

function measureFrameRate() {
  availableItems.forEach((item) => upgradeChecker(item));
  const currentTime = performance.now();
  frameCount++;
  counter += rate / frameRate;

  if (currentTime - lastFrameTime >= 1000) {
    count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
    frameRate = frameCount;
    frameCount = 0;
    lastFrameTime = currentTime;
  }

  requestAnimationFrame(measureFrameRate);
}

requestAnimationFrame(measureFrameRate);
