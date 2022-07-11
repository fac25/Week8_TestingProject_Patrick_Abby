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
  const deleteBtn = createDeleteBtn(newLi, index);
  const todoName = document.createElement("label");

  todoName.htmlFor = `todo-checkbox-${index}`;
  todoName.textContent = todo.name;

  newLi.append(checkbox, todoName, deleteBtn);
  todosUl.append(newLi);
}

function createCheckbox(newLi, index) {
  const checkbox = document.createElement("input");

  newLi.classList.add(todosArr[index].isCompleted ? "todo--completed" : "todo");

  checkbox.id = `todo-checkbox-${index}`;
  checkbox.type = "checkbox";
  checkbox.checked = todosArr[index].isCompleted;

  checkbox.addEventListener("click", () => {
    console.log();
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
