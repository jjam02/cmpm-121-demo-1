import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;
let rate: number = 0;
const table = document.getElementById("upgrade table")!;

interface Item {
  name: string;
  cost: number;
  rate: number;
  own: number;
  button: HTMLButtonElement;
  emojiTable: string;
  emoji: string;
}

const availableItems: Item[] = [
  {
    name: "hamster on wheel",
    cost: 10,
    rate: 0.1,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🐹🎡",
    emoji: "🐹🎡",
  },
  {
    name: "coal miner",
    cost: 100,
    rate: 1,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🕺⛏",
    emoji: "🕺⛏",
  },
  {
    name: "wind turbine",
    cost: 1000,
    rate: 50,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🌬️🌾🏭",
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

function setUpgradeTable(upgrade: Item) {
  const newRow = document.createElement("tr");
  newRow.id = `${upgrade.name} row`;
  const name = document.createElement("td");
  name.textContent = `${upgrade.name} ` + `${upgrade.emoji}`;

  const amount = document.createElement("td");
  amount.textContent = "0";

  newRow.appendChild(name);
  newRow.appendChild(amount);
  table?.appendChild(newRow);
}

function updateUpgradeTable(upgrade: Item): void {
  const row = document.getElementById(
    `${upgrade.name} row`,
  ) as HTMLTableRowElement;

  row.cells[1].textContent = `${upgrade.own}` + `${upgrade.emojiTable}`;
  upgrade.emojiTable += "|" + upgrade.emoji;
}

function updateUpgrade(upgrade: Item): void {
  updateCounter(upgrade);
  upgrade.cost *= 1.15;
  upgrade.own += 1;
  setUpgradeText(upgrade);
  updateUpgradeTable(upgrade);
}

function upgradeSetup(upgrades: Item[]) {
  upgrades.forEach((item) => {
    setUpgradeText(item);
    item.button.disabled = true;
    setUpgradeTable(item);
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

const clicker = document.createElement("button");
clicker.style.fontSize = "50px";
clicker.innerHTML = "GENERATE POWER <br>⚡";

clicker.addEventListener("click", () => {
  clicker.classList.add("flashing");

  // Simulate a delay for the flashing effect
  setTimeout(() => {
    // Remove the flashing effect class after a certain time (e.g., 1 second)
    clicker.classList.remove("flashing");
  }, 1000); // Adjust the time as needed
  counter += 1;
  count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
});
app.append(clicker);

const rateInfo = document.createElement("h2");
rateInfo.innerHTML = `autoclick ⚡${rate}/sec`;
app.append(rateInfo);

upgradeSetup(availableItems);

const count = document.createElement("div");
count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
count.style.fontSize = "50px";
app.append(count);

function upgradeChecker(upgrade: Item) {
  upgrade.button.disabled = upgrade.cost > counter;
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
