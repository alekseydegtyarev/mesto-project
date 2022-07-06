//вебинар по валидации 14.06

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input-edit',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-edit_state_invalid',
  errorClass: 'error'
}

const showError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!isInputValid) {
    showError(errorElement, inputElement, config);
  }
  else {
    hideError(errorElement, inputElement, config);
  }
}

const toggleButtonState = (button, isActive= false, config) => {
  if(isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
  else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

const setEventListener = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButton, formElement.checkValidity(), config); //кнопка при открытии неактивна
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(submitButton, formElement.checkValidity(), config);
    });
  });
}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    setEventListener(form, config);
  });
}

export {validationConfig, showError, hideError, checkInputValidity, toggleButtonState, setEventListener, enableValidation};
