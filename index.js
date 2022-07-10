let todosArr = [];

const todosUl = document.querySelector("ul");
const filterDropDown = document.querySelector(".filter");
const saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", addTodo);
filterDropDown.addEventListener("change", renderFilteredTodos);

function addTodo(event) {
  event.preventDefault();

  const inputValue = document.querySelector(".task-input").value;
  const newTodo = { name: inputValue, isCompleted: false };

  todosArr.push(newTodo);
  renderFilteredTodos(todosArr);
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

function createTodo(todo, index) {
  const newLi = document.createElement("li");
  const checkbox = createCheckbox(newLi, index);
  const deleteBtn = createDeleteBtn(newLi);
  const todoName = document.createElement("p");

  todoName.textContent = todo.name;

  newLi.append(checkbox, todoName, deleteBtn);
  todosUl.append(newLi);
}

function createCheckbox(newTask, index) {
  const checkbox = document.createElement("input");
  const isCompleted = todosArr[index].isCompleted;

  checkbox.type = "checkbox";
  checkbox.classList = isCompleted ? "completed" : "";
  checkbox.checked = isCompleted;

  checkbox.addEventListener("click", () => {
    newTask.classList.toggle("completed");
    todosArr[index].isCompleted = !isCompleted;
  });

  return checkbox;
}

function createDeleteBtn(newTask) {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
  });

  return deleteBtn;
}
