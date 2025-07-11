class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._todoElement = selector.content.querySelector(".todo").cloneNode(true);
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

  _setEventListeners() {
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => this._todoElement.remove());
  }

  getView() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoCheckboxEl.checked = this._completed;
    todoNameEl.textContent = this._name;
    this._setInputIDs(todoCheckboxEl, todoLabel);
    this._displayDueDate(todoDate);
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
