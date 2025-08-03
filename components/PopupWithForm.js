import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".popup__input");
    const inputValues = {};
    inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      const inputValues = this._getInputValues();
      this._handleFormSubmit(evt, inputValues);
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
