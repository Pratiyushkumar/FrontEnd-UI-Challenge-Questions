const undoBtn = document.querySelector(".undoBtn");
const redoBtn = document.querySelector(".redoBtn");
const numberBtn = document.querySelectorAll(".numberBtn");
const result = document.querySelector(".result");
const historyContainer = document.querySelector(".history__container");

const redoNode = []; //on clicking of redoButton
const undoNode = []; //on clicking of undoButton(for node)
const redoArray = []; //on clicking of redoButton
const undoArray = []; //on clicking of undoButton(for numbers)

numberBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    let node = ele;
    showResult(node);
  });
});

undoBtn.addEventListener("click", () => {
  undoButton();
});

redoBtn.addEventListener("click", () => {
  redoButton();
});

function showResult(node) {
  let number = parseInt(node.textContent.slice(1, node.textContent.length));
  let sign = node.textContent[0];
  let answer = 0;
  const historyElement = document.createElement("div");
  historyElement.className = "logElements";

  const nodeTextContent = `${node.textContent}`;
  let beforeResult = result.textContent;

  if (sign === "-") {
    answer = parseInt(result.textContent) - number;
  } else {
    answer = parseInt(result.textContent) + number;
  }

  historyElement.append(nodeTextContent, `    (${beforeResult}-->${answer})`);
  historyContainer.appendChild(historyElement);
  // redoArray.push(answer);
  undoArray.push(beforeResult);
  undoNode.push(historyElement);
  result.innerText = answer;
  // console.log("redoArray :", redoArray);
  // console.log("undoArray : ", undoArray);
  // console.log("undoNode :", undoNode);
}

function undoButton() {
  redoBtn.disabled = false;
  let lastElementOfUndo = result.textContent;
  redoArray.push(lastElementOfUndo);
  // console.log("lastElementOfUndo :", lastElementOfUndo);
  // console.log("redoArray :", redoArray);
  if (undoArray.length > 0) {
    let element = undoArray.pop();
    if (element !== undefined) {
      result.innerText = element;
      historyContainer.removeChild(historyContainer.lastElementChild);
    }
    let beforeEle = undoNode.pop();
    redoNode.push(beforeEle);
  }
  console.log("undoArray : ", undoArray);
}

function redoButton() {
  let lastElementOfRedo = result.textContent;
  undoArray.push(lastElementOfRedo);
  // console.log("lastElementOfRedo :", lastElementOfRedo);
  // console.log("undoArray :", undoArray);
  if (redoArray.length > 0) {
    let element = redoArray.pop();
    if (element > 0) {
      result.innerText = element;
      let afterEle = redoNode.shift();
      undoNode.push(afterEle);
      historyContainer.appendChild(afterEle);
    }
  }
  if (redoArray.length === 0) {
    redoBtn.disabled = true;
  }
  // console.log("redoArray : ", redoArray);
  // console.log("redoNode : ", redoNode);
}
