import '../pages/index.css'; // добавьте импорт главного файла стилей

import { cards, handleClickBtnDelete, handleClickBtnLike, handleClickBtnZoom, initiateCard, renderCard, addCard } from './card.js';
import {popupProfile, btnCloseProfile, popupPlace, btnClosePlace, formInfoEdit, addPlaceBtn, placeNameInput, placeLinkInput} from './utils.js';
import {validationConfig, enableValidation} from './validate.js';
import {openPopup, closePopup, handleProfileFormSubmit, closeByOverlay} from './modal.js';


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formInfoEdit.addEventListener('submit', handleProfileFormSubmit);


//закрытие формы редактирования профиля
btnCloseProfile.addEventListener('click', () => closePopup(popupProfile));

//при нажатии на кнопку с "+" открываем поп-ап добавления карточек
addPlaceBtn.addEventListener('click', () => {
  openPopup(popupPlace);
  placeNameInput.value = "";
  placeLinkInput.value = "";
});

//при нажатии на "Х" закрывает попап добавления карточек
btnClosePlace.addEventListener('click', () => closePopup(popupPlace));



//при нажатии на оверлэй закрывает попап
window.addEventListener('click', closeByOverlay);



enableValidation(validationConfig);


