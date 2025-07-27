class Todo {
  constructor(
    { data, handleCheckboxChange, handleDeleteButtonClick },
    selector
  ) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._handleCheckboxChange = handleCheckboxChange;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._selector = selector;
  }

  // Apply id and for attributes.
  // The id will initially be undefined for new todos.
  _setInputIDs(input, label) {
    input.id = `todo-${this._id}`;
    label.setAttribute("for", `todo-${this._id}`);
  }

  // If a due date has been set, parsing this it with `new Date` will return a
  // number. If so, we display a string version of the due date in the todo.
  _displayDueDate(element) {
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      element.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._deleteButton = this._todoElement.querySelector(".todo__delete-btn");

    this._deleteButton.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDeleteButtonClick(this._checkbox);
    });

    this._checkbox.addEventListener("change", () =>
      this._handleCheckboxChange(this._checkbox)
    );
  }

  getView() {
    this._todoElement = this._getTemplate();

    this._todoElement.querySelector(".todo__completed").checked =
      this._completed;
    this._todoElement.querySelector(".todo__name").textContent = this._name;

    this._checkbox = this._todoElement.querySelector(".todo__completed");
    this._label = this._todoElement.querySelector(".todo__label");
    this._dateElement = this._todoElement.querySelector(".todo__date");

    this._setInputIDs(this._checkbox, this._label);
    this._displayDueDate(this._dateElement);
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
