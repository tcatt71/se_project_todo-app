import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Counter from "../components/Counter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const formValidator = new FormValidator(validationConfig, addTodoForm);
const counter = new Counter();

const popupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const id = uuidv4();

    const formValues = popupWithForm._getInputValues();
    const { name, date: dateInput } = formValues;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { id, name, date };
    const todo = new Todo(values, todoTemplate, counter);
    renderTodo(todo);

    formValidator.resetValidation();
    counter.updateCounter();
    popupWithForm.close();
  },
});

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, todoTemplate, counter);
    const todoElement = todo.getView();
    todoListSection.addItem(todoElement);
    counter.updateCounter();
  },
  containerSelector: todosList,
});

const renderTodo = (todo) => {
  const todoElement = todo.getView();
  todosList.append(todoElement);
};

popupWithForm.setEventListeners();
addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});
formValidator.enableValidation();
todoListSection.renderItems();
