class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed === true).length;
    this._total = todos.length;

    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed++;
    } else {
      this._completed--;
    }
    this._updateText();
  };

  updateTotal = (increment) => {
    increment ? this._total++ : this._total--;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
