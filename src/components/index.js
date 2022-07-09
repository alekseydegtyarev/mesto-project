import '../pages/index.css'; // добавьте импорт главного файла стилей

import {handleClickBtnLike, handleClickBtnZoom, initiateCard, renderCard, addCard } from './card.js';
import {
  popupProfile,
  btnCloseProfile,
  popupPlace,
  btnClosePlace,
  formInfoEdit,
  addPlaceBtn,
  placeNameInput,
  placeLinkInput,
  cardsList
} from './utils.js';
import {validationConfig, enableValidation} from './validate.js';
import {openPopup, closePopup, handleProfileFormSubmit, closeByOverlay} from './modal.js';
import {config, getAllCards, onResponce, addCards, removeCard} from './api.js'

getAllCards()
  .then((data) => {
    data.forEach((item) => {
      renderCard(item, cardsList)
    })
  })
  .catch((err) => {
    console.log(err);
  })

const btnAvatar = document.querySelector('.profile__avatar-button'),
      popupAvatar = document.querySelector('.popup__avatar'),
      btnCloseAvatarEdit = document.querySelector('.popup__close_avatar'),
      btnSubmitAvatar = document.querySelector('.popup__save-button_avatar');

btnAvatar.addEventListener('click', () => {
  openPopup(popupAvatar)
})

btnCloseAvatarEdit.addEventListener('click', () => closePopup(popupAvatar));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formInfoEdit.addEventListener('submit', handleProfileFormSubmit);


//закрытие формы редактирования профиля
btnCloseProfile.addEventListener('click', () => closePopup(popupProfile));

//при нажатии на кнопку с "+" открываем поп-ап добавления карточек
addPlaceBtn.addEventListener('click', () => {
  openPopup(popupPlace);
});

//при нажатии на "Х" закрывает попап добавления карточек
btnClosePlace.addEventListener('click', () => closePopup(popupPlace));




enableValidation(validationConfig);


