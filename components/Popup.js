class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose.bind(this));
  }

  close() {
    document.removeEventListener("keydown", this._handleEscapeClose.bind(this));
    this._popup.classList.remove("popup_visible");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  _handleOutsideFormClick(evt) {
    if (evt.target.classList.contains("popup")) this.close();
  }

  setEventListeners() {
    const closeButton = document.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) =>
      this._handleOutsideFormClick(evt)
    );
  }
}

export default Popup;
