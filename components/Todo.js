class Todo {
  constructor(data, selector, counter) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._todoElement = selector.content.querySelector(".todo").cloneNode(true);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._counter = counter;
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
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._counter.updateCounter();
    });

    this._todoCheckboxEl.addEventListener(
      "change",
      this._counter.updateCounter
    );
  }

  getView() {
    this._todoCheckboxEl.checked = this._completed;
    this._todoNameEl.textContent = this._name;
    this._setInputIDs(this._todoCheckboxEl, this._todoLabel);
    this._displayDueDate(this._todoDate);
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
