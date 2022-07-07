const testListEl = document.querySelector(".list");
const testInput = document.querySelector(".task-input");
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
    return equal(testInput.value, "12345635");
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
    return equal(
      newTask.textContent.slice(0, -6),
      "Call John at: 074 9124-1237"
    );
  });

  test("renders delete button", () => {
    emulateInputAndClick("newTask");
    const newTask = document.querySelector("li");
    const deleteButton = newTask.querySelector("button");

    return equal(Boolean(deleteButton), true);
  });

  test("renders task checkbox", () => {
    emulateInputAndClick("newTask");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");

    return equal(Boolean(checkbox), true);
  });
});

describe("When user clicks task checkbox", () => {
  test("it toggles the task's 'completed' class", () => {
    emulateInputAndClick("mock test item");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");
    checkbox.click();

    return equal(newTask.classList.contains("completed"), true);
  });

  test("it toggles data-completed value", () => {
    emulateInputAndClick("mock test item");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");
    checkbox.click();

    const isTaskCompleted = newTask.dataset.completed === "true";
    return equal(isTaskCompleted, true);
  });
});

describe("User delete a task from the list", () => {
  test("user insert exsting task name and click delete button to delete the task", () => {
    emulateInputAndClick("toDelete");
    emulateInputAndClick("toDelete2");
    const testDeleteBtn = document.querySelectorAll(".delete-btn");
    testDeleteBtn[0].click();
    return equal(
      testListEl.innerHTML,
      `<li data-completed="false"><input type="checkbox"><p>toDelete2</p><button class="delete-btn">Delete</button></li>`
    );
  });
  test("user insert exsting task name and click delete button to delete multiple tasks", () => {
    emulateInputAndClick("toDelete");
    emulateInputAndClick("toDelete1");
    emulateInputAndClick("toDelete2");
    emulateInputAndClick("toDelete3");
    emulateInputAndClick("toDelete4");
    emulateInputAndClick("toDelete5");
    const testDeleteBtn = document.querySelectorAll(".delete-btn");
    testDeleteBtn[0].click();
    testDeleteBtn[2].click();
    testDeleteBtn[4].click();
    testDeleteBtn[5].click();
    return equal(
      testListEl.children.length, 2
    );
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
