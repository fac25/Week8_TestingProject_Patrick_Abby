const saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", addTask);

function addTask(event) {
  event.preventDefault();
  createTodo();
}

function createTodo() {
  const inputValue = document.querySelector("input").value;
  const listEl = document.querySelector("ul");
  const newTask = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const newTaskName = document.createElement("p");
  newTaskName.textContent = inputValue;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.addEventListener("click", () => newTask.remove());

  newTask.append(checkbox, newTaskName, deleteBtn);
  listEl.append(newTask);
}
