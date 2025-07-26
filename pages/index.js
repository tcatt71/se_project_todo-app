import {
  initialTodos,
  validationConfig,
  todoTemplate,
  addTodoPopup,
  todosList,
  counterTextSelector,
  addTodoButton,
  addTodoForm,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Counter from "../components/Counter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const formValidator = new FormValidator(validationConfig, addTodoForm);
const counter = new Counter(initialTodos, counterTextSelector);

const popupWithForm = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      const id = uuidv4();

      const formValues = popupWithForm._getInputValues();
      const { name, date: dateInput } = formValues;

      // Create a date object and adjust for timezone
      const formattedDate = getFormattedDate(dateInput);
      const values = { id, name, formattedDate };

      renderTodo(values);

      formValidator.resetValidation();
      counter.updateTotal(true);
      popupWithForm.close();
    },
  },
  addTodoPopup
);

const todoListSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: todosList,
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

function getFormattedDate(dateString) {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
}

popupWithForm.setEventListeners();
addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});
formValidator.enableValidation();
todoListSection.renderItems();
