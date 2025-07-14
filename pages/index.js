import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Counter from "../components/Counter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const formValidator = new FormValidator(validationConfig, addTodoForm);
const counter = new Counter();

const handleEscapeKeydown = (evt) => {
  if (evt.key === "Escape") closeModal(addTodoPopup);
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscapeKeydown);
};

const closeModal = (modal) => {
  document.removeEventListener("keydown", handleEscapeKeydown);
  modal.classList.remove("popup_visible");
};

const renderTodo = (todo) => {
  const todoElement = todo.getView();
  todosList.append(todoElement);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const id = uuidv4();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id, name, date };
  const todo = new Todo(values, todoTemplate, counter);
  renderTodo(todo);
  formValidator.resetValidation();
  counter.updateCounter();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, todoTemplate, counter);
  renderTodo(todo);
  counter.updateCounter();
});

formValidator.enableValidation();
