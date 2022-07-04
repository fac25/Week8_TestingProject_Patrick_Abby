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

  newTask.textContent = inputValue;
  listEl.append(newTask);
}
