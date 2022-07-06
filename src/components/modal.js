// функция открытия поп-апа. вместо popup в слушателях кнопок нужно будет указывать объявленные выше переменные конкретных попапов
import {
  about,
  aboutInput,
  imgCaption,
  imgZoomed,
  name,
  nameInput,
  popupImgZoom,
  popupProfile,
  profileBtnEdit
} from "./utils.js";
import {validationConfig, toggleButtonState} from "./validate.js";

function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
  const submitButton = popup.querySelector(validationConfig.submitButtonSelector);
  if (popup.querySelector(validationConfig.submitButtonSelector) !== null) { //https://bobbyhadz.com/blog/javascript-check-if-element-has-child-with-id
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  }
}

//в "значение"(value) инпутов кладём текущий текст со страницы
function addProfileToInput() {
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

//функция закрытия попапа, по аналогии с открытием, только заменяем "add" на "remove"
function closePopup(popup) {
  popup.classList.remove('popup_opened'); //добавляем класс, чтобы попап был виден
}

//при нажатии на кнопку с карандашом открываем поп-ап
profileBtnEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  addProfileToInput();
}); //передаём в параметр popup попап редактирования профиля

//сохранение текста из инпутов на страницу, часть кода с комментариями взята из тз, комментарии практикума частично сохранены
//upd вынес объявление переменных в начало файла
// Находим форму в DOM
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей aboutInput и nameInput из свойства value
  about.textContent = aboutInput.value;
  name.textContent = nameInput.value;// Вставьте новые значения с помощью textContent
  closePopup(popupProfile);
}

//открытие попапа с зумом картинки

const handleClickBtnZoom = function(element) {
  openPopup(popupImgZoom); //добавляем класс, чтобы попап был виден

  imgZoomed.src = element.target.src;
  imgZoomed.alt = element.target.alt;
  imgCaption.textContent = element.target.alt;
}

//закрытие по esc
function escHandler(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

//в телеге страший студент посоветовал вешать слушатель на всё окно, а не на документ
window.addEventListener('keydown', escHandler);
// document.addEventListener('keydown', escHandler);

//Закрытие кликом на оверлей
function closeByOverlay (evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

export {openPopup, addProfileToInput, closePopup, handleProfileFormSubmit, escHandler, closeByOverlay, handleClickBtnZoom};
