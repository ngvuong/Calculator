//store concurrent data in a global object
const data = {
  currentDisplay: 0,
};

//display the number
const display = document.querySelector(".display");
function displayNumber(num) {
  currDis = data.currentDisplay;
  //avoid printing repeated leading zero
  if (currDis == 0 && num == 0) num = "";

  if (num < 1 && num.toString().length > 9) {
    num = num.toFixed(7);
  }
  const lenNum = num.toString().length;
  console.log(num, lenNum);
  const lenDis = currDis.toString().replace("-", "").length;
  currDis += num;
  if (lenDis < 10) {
    if (lenNum > 9) {
      currDis = (+currDis).toExponential(1);
      display.textContent = currDis;
    } else {
      //take out leading zero if not followed by decimal
      display.textContent = +currDis || currDis;
    }
    data.currentDisplay = currDis;
  }
}

//handle button clicks
const Buttons = document.querySelectorAll("button");
Buttons.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    switch (this.classList[0]) {
      case "numbers":
        handleNumbers(this);
        break;
      case "operators":
        handleOperators(this);
        break;
      case "misc":
        handleMisc(this);
    }
  })
);

function handleNumbers(btn) {
  let val = btn.value;
  let currDis = data.currentDisplay.toString();
  if (val != "." || currDis.indexOf(val) == -1) {
    displayNumber(val);
  }
}

function handleOperators(btn) {
  const op = btn.value;
  let currDis = data.currentDisplay;
  const opExist = !!data.operation;
  if (opExist) {
    if (op == "equal") {
      data.num2 = currDis || data.num2 || data.num1;
    } else {
      data.num2 = null;
      data.num2 = currDis || data.num2;
    }
  } else data.num1 = currDis;
  clearDisplay();
  if (data.num1 && data.num2 && data.operation) {
    operate(data.operation, data.num1, data.num2);
  }
  data.operation = op == "equal" ? data.operation : op;
}

function handleMisc(btn) {
  const val = btn.value;
  let currDis = data.currentDisplay;
  if (val == "percent") {
    if (+display.textContent) {
      currDis = +(display.textContent / 100).toFixed(9);
    }
  } else if (val == "negative") {
    currDis = -currDis;
    if (currDis == -0) currDis = "-" + currDis;
  } else if (val == "back") {
    currDis = currDis.slice(0, -1) || 0;
  } else {
    reset();
    return;
  }
  console.log(currDis);
  data.currentDisplay = currDis;
  displayNumber("");
}

//keyboard input handling
document.addEventListener("keydown", handleKbInput);
function handleKbInput(e) {
  keyName = e.key;
  if (keyName == "Enter") keyName = "=";
  //select and trigger click appropriate button if key name matches
  const key = document.querySelector(`button[name='${keyName}']`);
  if (key) key.click();
}

function operate(operation, num1, num2) {
  const fn = window[operation];
  data.result = fn(+num1, +num2);
  clearDisplay();
  display.classList.add("flicker");
  displayNumber(data.result);
  setTimeout(removeFlicker, 50);
  clearDisplay();
  data.num1 = data.result == 0 ? "0" : data.result;
}

//flicker display only on showing result
function removeFlicker() {
  display.classList.remove("flicker");
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 == 0) {
    bod = document.querySelector("body");
    bod.textContent = "Shutting down the internet";
    bod.classList.add("brokenBod", "loading");
  }
  return num1 / num2;
}

function percent(num) {
  return num / 100;
}

//for Clear button
function reset() {
  data.num1 = 0;
  data.operation = null;
  data.num2 = null;
  data.result = null;
  data.currentDisplay = 0;
  displayNumber("");
}

// prepare display for new number display
function clearDisplay() {
  data.currentDisplay = 0;
}
