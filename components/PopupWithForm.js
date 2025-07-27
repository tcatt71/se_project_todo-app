import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".popup__input");
    const formValues = {};
    inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  setEventListeners() {
    const popupForm = document.forms["add-todo-form"];

    popupForm.addEventListener("submit", (evt) => {
      const formValues = this._getInputValues();
      this._handleFormSubmit(evt, formValues);
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
