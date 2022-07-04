const testListEl = document.querySelector(".list");
const testInput = document.querySelector("input");
const testSaveBtn = document.querySelector(".save-btn");

describe("When changes input value", () => {
  testInput.value = "Shopping";
  test("standard strings are used", testInput.value, "Shopping");
});

describe("When user clicks save", () => {
  emulateInputAndClick("Run");
  test("list length is updated", testListEl.children.length, 1);

  emulateInputAndClick("Call 074 9124-1237");
  const newTask = document.querySelector("li");
  test(
    "correct content is added to the new task",
    newTask.textContent,
    "Call 074 9124-1237"
  );
});

function resetTest() {
  testListEl.innerHTML = "";
  testInput.value = "";
}

function emulateInputAndClick(text) {
  testInput.value = text;
  saveBtn.click();
}
