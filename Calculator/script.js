const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      screen.value = "";
    } else if (value === "=") {
      try {
        let expression = screen.value
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-");

        screen.value = eval(expression);
      } catch {
        screen.value = "Error";
      }
    } else {
      screen.value += value;
    }
  });
});
