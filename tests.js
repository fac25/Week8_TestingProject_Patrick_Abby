const testListEl = document.querySelector(".list");
const testInput = document.querySelector(".task-input");
const testFilterDropdown = document.querySelector(".filter");
const testSaveBtn = document.querySelector(".save-btn");

describe("When user clicks save", () => {
  test("if input field is empty, display error", () => {
    createTestTodo("");
    const errorContainer = document.querySelector(".error");
    return equal(errorContainer.textContent, "Please type in something.");
  });

  test("list length is updated on task creation", () => {
    createTestTodo("Run");
    return equal(testListEl.children.length, 1);
  });

  test("correct content is added to the new task", () => {
    createTestTodo("Call John at: 074 9124-1237");
    const newTask = document.querySelector("li");
    return equal(
      newTask.textContent.slice(0, -10),
      "Call John at: 074 9124-1237"
    );
  });

  test("renders delete button", () => {
    createTestTodo("newTask");
    const newTask = document.querySelector("li");
    const deleteButton = newTask.querySelector("button");

    return equal(Boolean(deleteButton), true);
  });

  test("renders task checkbox", () => {
    createTestTodo("newTask");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");

    return equal(Boolean(checkbox), true);
  });

  test("input value is set to empty string after submission", () => {
    createTestTodo("lol");
    return equal(testInput.value, "");
  });
});

describe("When user clicks task checkbox", () => {
  test("toggles the task's 'completed' class", () => {
    createTestTodo("mock test item");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");
    checkbox.click();

    return equal(newTask.classList.contains("todo--completed"), true);
  });

  test("toggles todo's 'completed' value", () => {
    createTestTodo("mock test item");
    const newTask = document.querySelector("li");
    const checkbox = newTask.querySelector("input");
    checkbox.click();

    const todoObj = todosArr.find((todo) => todo.name === "mock test item");

    return equal(todoObj.isCompleted, true);
  });
});

describe("User delete a task from the list", () => {
  test("user insert exsting task name and click delete button to delete the task", () => {
    createTestTodo("toDelete");
    createTestTodo("toDelete2");
    const testDeleteBtn = document.querySelectorAll(".delete-btn");
    testDeleteBtn[0].click();

    const remainingTodoName = testListEl.querySelector("label");

    return equal(remainingTodoName.textContent, "toDelete2");
  });

  test("user insert exsting task name and click delete button to delete multiple tasks", () => {
    createTestTodo("toDelete");
    createTestTodo("toDelete1");
    createTestTodo("toDelete2");
    createTestTodo("toDelete3");
    createTestTodo("toDelete4");
    createTestTodo("toDelete5");
    const testDeleteBtn = document.querySelectorAll(".delete-btn");
    testDeleteBtn[0].click();
    testDeleteBtn[2].click();
    testDeleteBtn[4].click();
    testDeleteBtn[5].click();
    return equal(testListEl.children.length, 2);
  });
});

describe("When user applies filter", () => {
  test("should display correct todos", () => {
    // User creates two tasks
    createTestTodo("first");
    createTestTodo("second");

    // User completes the second task
    const secondCheckbox = document.querySelectorAll(
      "input[type='checkbox']"
    )[1];
    secondCheckbox.click();

    // Changes filter to 'Completed'
    filterDropDown.value = "Completed";
    renderFilteredTodos();

    // Check whether the task is rendered with correct class
    const completedTodo = document.querySelector("li");

    return equal(completedTodo.classList.contains("todo--completed"), true);
  });

  test("should display only pending todos length", () => {
    createTestTodo("first");
    createTestTodo("second");
    createTestTodo("third");

    const secondCheckbox = document.querySelectorAll(
      "input[type='checkbox']"
    )[1];
    secondCheckbox.click();

    testFilterDropdown.value = "Pending";
    renderFilteredTodos();

    return equal(testListEl.children.length, 2);
  });

  test("should display only completed todos length", () => {
    createTestTodo("first");
    createTestTodo("second");
    createTestTodo("third");

    const secondCheckbox = document.querySelectorAll(
      "input[type='checkbox']"
    )[1];
    secondCheckbox.click();

    testFilterDropdown.value = "Completed";
    renderFilteredTodos();

    return equal(testListEl.children.length, 1);
  });

  test("should display all todos length", () => {
    createTestTodo("first");
    createTestTodo("second");
    createTestTodo("third");

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const secondCheckbox = checkboxes[1];
    secondCheckbox.click();

    const thirdCheckbox = checkboxes[2];
    thirdCheckbox.click();

    testFilterDropdown.value = "All";
    renderFilteredTodos();

    return equal(testListEl.children.length, 3);
  });
});

function resetTestEnvironment() {
  testListEl.innerHTML = "";
  testInput.value = "";
  testFilterDropdown.value = "All";
  todosArr = [];
}

function createTestTodo(text) {
  testInput.value = text;
  saveBtn.click();
}
