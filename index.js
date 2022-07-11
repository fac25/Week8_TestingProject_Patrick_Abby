let todosArr = [];

const todosUl = document.querySelector("ul");
const filterDropDown = document.querySelector(".filter");
const saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", addTodo);
filterDropDown.addEventListener("change", renderFilteredTodos);

function addTodo(event) {
  event.preventDefault();

  const input = document.querySelector(".task-input");
  const newTodo = { name: input.value, isCompleted: false };

  if (input.value.length === 0) return displayError();

  todosArr.push(newTodo);
  renderFilteredTodos(todosArr);

  // Reset input
  input.value = "";
}

function renderFilteredTodos() {
  const filterActions = {
    All: () => true,
    Pending: (todo) => todo.isCompleted === false,
    Completed: (todo) => todo.isCompleted === true,
  };

  const filteredTodosArr = todosArr.filter(filterActions[filterDropDown.value]);
  renderTodos(filteredTodosArr);
}

function renderTodos(arr) {
  todosUl.innerHTML = "";
  arr.forEach((todo, index) => createTodo(todo, index));
}

function createTodo(todo) {
  const todoIndex = todosArr.indexOf(todo);
  const newLi = document.createElement("li");
  const checkbox = createCheckbox(newLi, todoIndex);
  const deleteBtn = createDeleteBtn(newLi, todoIndex);
  const todoName = document.createElement("label");

  newLi.classList.add(
    todosArr[todoIndex].isCompleted ? "todo--completed" : "todo"
  );

  todoName.htmlFor = `todo-checkbox-${todoIndex}`;
  todoName.textContent = todo.name;

  newLi.append(checkbox, todoName, deleteBtn);
  todosUl.append(newLi);
}

function createCheckbox(newLi, index) {
  const checkbox = document.createElement("input");

  checkbox.id = `todo-checkbox-${index}`;
  checkbox.type = "checkbox";
  checkbox.checked = todosArr[index].isCompleted;

  checkbox.addEventListener("click", () => {
    newLi.classList.toggle("todo--completed");
    todosArr[index].isCompleted = !todosArr[index].isCompleted;
  });

  return checkbox;
}

function createDeleteBtn(newLi, index) {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "🗑️ Delete";
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.addEventListener("click", () => {
    newLi.remove();
    todosArr.splice(index, 1); // Remove current todo from todosArr
  });

  return deleteBtn;
}

function displayError() {
  const errorContainer = document.querySelector(".error");
  errorContainer.textContent = "Please type in something.";

  setTimeout(() => (errorContainer.textContent = ""), 2000);
}
