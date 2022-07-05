const testListEl = document.querySelector(".list");
const testInput = document.querySelector("input");
const testSaveBtn = document.querySelector(".save-btn");

describe("When user changes input value", () => {
  test("standard strings", () => {
    testInput.value = "Shopping";
    return equal(testInput.value, "Shopping");
  });

  test("random symbols", () => {
    testInput.value = "%*!'l;";
    return equal(testInput.value, "%*!'l;");
  });

  test("random numbers", () => {
    testInput.value = "12345675";
    return equal(testInput.value, "12345675");
  });
});

describe("When user clicks save", () => {
  test("list length is updated on task creation", () => {
    emulateInputAndClick("Run");
    return equal(testListEl.children.length, 1);
  });

  test("correct content is added to the new task", () => {
    emulateInputAndClick("Call John at: 074 9124-1237");
    const newTask = document.querySelector("li");
    return equal(newTask.textContent, "Call John at: 074 9124-1237");
  });
});

function resetTestEnvironment() {
  testListEl.innerHTML = "";
  testInput.value = "";
}

function emulateInputAndClick(text) {
  testInput.value = text;
  saveBtn.click();
}
