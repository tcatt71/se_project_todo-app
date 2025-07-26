import {
  initialTodos,
  validationConfig,
  sectionConfig,
  todoConfig,
  counterConfig,
  popupWithFormConfig,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Counter from "../components/Counter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const { todoListSelector } = sectionConfig;
const { todoTemplate } = todoConfig;
const { textSelector } = counterConfig;
const { formPopupSelector } = popupWithFormConfig;

const formValidator = new FormValidator(validationConfig, addTodoForm);
const counter = new Counter(initialTodos, textSelector);

const popupWithForm = new PopupWithForm({
  popupSelector: formPopupSelector,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const id = uuidv4();

    const formValues = popupWithForm._getInputValues();
    const { name, date: dateInput } = formValues;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { id, name, date };
    renderTodo(values);

    formValidator.resetValidation();
    counter.updateTotal(true);
    popupWithForm.close();
  },
});

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: todoListSelector,
});

function createTodo(item) {
  return new Todo(
    {
      data: item,
      handleCheckboxChange: (checkbox) => {
        checkbox.checked
          ? counter.updateCompleted(true)
          : counter.updateCompleted(false);
      },
      handleDeleteButtonClick: (checkbox) => {
        counter.updateTotal(false);
        if (checkbox.checked) counter.updateCompleted(false);
      },
    },
    todoTemplate
  );
}

function renderTodo(values) {
  const todo = createTodo(values);
  const todoElement = todo.getView();
  todoListSection.addItem(todoElement);
}

popupWithForm.setEventListeners();
addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});
formValidator.enableValidation();
todoListSection.renderItems();
