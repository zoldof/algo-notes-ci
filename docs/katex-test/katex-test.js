import { renderKatex } from "../katex.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const clearBtn = document.getElementById("clear");

function render() {
  const html = input.value || input.defaultValue;

  output.innerHTML = html;
  renderKatex(output);
}

input.addEventListener("input", render);

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.innerHTML = "";
});

window.addEventListener("DOMContentLoaded", () => {
  render();
});
