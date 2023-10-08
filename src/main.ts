import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathan Alvarez game";
let counter: number = 0;

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
