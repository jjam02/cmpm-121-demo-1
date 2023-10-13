import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Amp it up!";
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
  desc: string;
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
    desc: "harvest the labor of rodents",
  },
  {
    name: "coal miner",
    cost: 100,
    rate: 1,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🕺⛏",
    emoji: "🕺⛏",
    desc: "they yearn for the mines",
  },
  {
    name: "wind turbine",
    cost: 1000,
    rate: 50,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🌬️🌾🏭",
    emoji: "🌬️🌾🏭",
    desc: " catch the breeze with clean energy",
  },
  {
    name: "Solar Panels",
    cost: 1250,
    rate: 75,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|🌞🔌",
    emoji: "🌞🔌",
    desc: " the power of the sun in the palm of my roof",
  },
  {
    name: "Nuclear Reactor",
    cost: 2000,
    rate: 150,
    own: 0,
    button: document.createElement("button"),
    emojiTable: "|",
    emoji: "⚛️🏭🔋",
    desc: "nothing dangerous happening here",
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
  upgrade.button.innerHTML = `<p style = "font-size: 20px;" >${upgrade.name} ${
    upgrade.emoji
  } </br> (${upgrade.cost.toFixed(2)} ⚡)| +${
    upgrade.rate
  } ⚡/sec </p> <br> <i>${upgrade.desc} </i>`;
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
clicker.style.fontSize = "30px";
clicker.innerHTML = "GENERATE POWER <br>⚡";

clicker.addEventListener("click", () => {
  clicker.classList.add("flashing");

  setTimeout(() => {
    clicker.classList.remove("flashing");
  }, 500);
  counter += 1;
  count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
});
app.append(clicker);

const rateInfo = document.createElement("h2");
rateInfo.innerHTML = `autoclick ⚡${rate}/sec`;
app.append(rateInfo);
const count = document.createElement("div");
count.innerHTML = `This much power ${counter.toFixed(0)} ⚡`;
//count.style.fontSize = "50px";
app.append(count);

upgradeSetup(availableItems);

function upgradeChecker(upgrade: Item) {
  upgrade.button.disabled = upgrade.cost > counter;
  if (!upgrade.button.disabled) {
    upgrade.button.classList.add("highlight");
  } else upgrade.button.classList.remove("highlight");
}

let frameCount = 0;
let lastFrameTime = performance.now();
let frameRate = 1; //min frame rate

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
