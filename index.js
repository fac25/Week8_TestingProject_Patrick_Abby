const saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", addTask);

function addTask(event) {
  event.preventDefault();
  createTodo();
}

function createTodo() {
  const inputValue = document.querySelector(".task-input").value;
  const listEl = document.querySelector("ul");
  const newTask = document.createElement("li");

  newTask.dataset.completed = false;

  // Create children
  const checkbox = createCheckbox(newTask);
  const deleteBtn = createDeleteBtn(newTask);
  const newTaskName = document.createElement("p");

  newTaskName.textContent = inputValue;

  newTask.append(checkbox, newTaskName, deleteBtn);
  listEl.append(newTask);
}

function createCheckbox(newTask) {
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.addEventListener("click", () => {
    newTask.classList.toggle("completed");
    newTask.dataset.completed = !JSON.parse(newTask.dataset.completed);
  });

  return checkbox;
}

function createDeleteBtn(newTask) {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.addEventListener("click", () => [newTask.remove()]);

  return deleteBtn;
}
