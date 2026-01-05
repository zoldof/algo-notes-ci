import renderKatex from "../katex.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const clearBtn = document.getElementById("clear");

function render() {
  output.textContent = input.value || input.defaultValue;
  renderKatex(output);
}

input.addEventListener("input", render);
clearBtn.addEventListener("click", () => {
  input.value = "";
  output.textContent = "";
});

window.addEventListener("DOMContentLoaded", () => {
  render();
});
