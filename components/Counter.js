class Counter {
  constructor() {
    this._counterText = document.querySelector(".counter__text");
  }

  _getNumberOfTodos = () => {
    const todoList = document.querySelectorAll(".todo");
    return todoList.length;
  };

  _getNumberOfCompletedTodos = () => {
    const todosCompleted = document.querySelectorAll(
      ".todo__completed:checked"
    );
    return todosCompleted.length;
  };

  _getTextContent = () => {
    return `Showing ${this._getNumberOfCompletedTodos()} out of ${this._getNumberOfTodos()} completed`;
  };

  updateCounter = () => {
    this._counterText.textContent = this._getTextContent();
  };
}

export default Counter;
