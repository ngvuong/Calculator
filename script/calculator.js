//store concurrent data in a global object
const data = {
  num1: 0,
  operation: null,
  num2: null,
  result: null,
  currentDisplay: 0,
};

//display the number
function displayNumber(num) {
  const display = document.querySelector("#display");
  currDis = data.currentDisplay;
  //avoid printing repeated leading zero
  if (currDis == 0 && num == 0) num = "";
  const len = currDis.toString().replace("-", "").length;
  currDis += num;
  if (len < 10) {
    //take out leading zero if not followed by decimal
    display.textContent = +currDis || currDis;
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
  let currDis = data.currentDisplay;
  if (val != "." || currDis.indexOf(val) == -1) {
    displayNumber(val);
  }
}

function handleOperators(btn) {
  const op = btn.value;
  //case: {n1}: = -> nothing; others -> store n1 and op
  const opExist = !!data.operation;
  if (opExist) {
    data.num2 = data.currentDisplay;
  } else data.num1 = data.currentDisplay;
  data.operation = op == "equal" ? data.operation : op;
  clearDisplay();
  if (op == "equal" && data.operation) {
    data.num2 = data.result ? data.num2 : data.num2 || data.num1;
  }
  if (data.num1 && data.num2) {
    operate(data.operation, data.num1, data.num2);
  }
}

function clearDisplay() {
  data.currentDisplay = 0;
}
// if (op != "=" && !data.num2) {
//   data.operation = op;
// } else if()
// if (data.num2 && !data.result) {
//   operate(data.operation, data.num1, data.num2);

// } else {
//   data.num1 = display.textContent || 0;
// }
//case: {n1, op}: = -> n1 op n1, store and display result,
//n1 = result; others -> store op

//case: {n1, op, n2}: all operators -> evaluate expression,
//store and display result, n1 = result; if = repeat eval
//if other op -> store new op

function handleMisc(btn) {
  console.log("hithere");
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
  console.log(operation, fn);
  data.result = fn(+num1, +num2);
  console.log(num1, num2, data.result);
  clearDisplay();
  displayNumber(data.result);
  clearDisplay();
  data.num1 = data.result;
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
