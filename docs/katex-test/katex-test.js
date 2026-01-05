import renderMathInElement from "../katex.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const clearBtn = document.getElementById("clear");

function render() {
  output.textContent = input.value || input.defaultValue;

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) =>
    katex.renderToString(expr, {
      displayMode: true,
      throwOnError: false
    })
  );

  text = text.replace(/\$([^$]+?)\$/g, (_, expr) =>
    katex.renderToString(expr, {
      displayMode: false,
      throwOnError: false
    })
  );

  output.innerHTML = text;
}

input.addEventListener("input", render);

clearBtn.addEventListener("click", () => {
  input.value = "";
  output.innerHTML = "";
});

window.addEventListener("DOMContentLoaded", () => {
  render();
});
