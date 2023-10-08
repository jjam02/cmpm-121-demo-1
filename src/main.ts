import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jonathans super fun adventure game where you click for hours";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
