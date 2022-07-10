import '../pages/index.css'; // добавьте импорт главного файла стилей

import {handleClickBtnZoom, initiateCard, renderCard, addCard } from './card.js';
import {profileBtnEdit, popupProfile, btnCloseProfile, popupPlace, btnClosePlace, imgZoomCloseBtn, name, about,
  nameInput, aboutInput, formInfoEdit, addPlaceBtn, placeNameInput, placeLinkInput, templateCard, cardsList, popupImgZoom,
  imgZoomed, imgCaption, formAddPlace, addPlaceSubmitBtn, changeInfoBtn, avatar, formAvatarEdit, avatarLinkInput, avatarSubmitBtn, profileSubmitBtn} from './utils.js';
import {validationConfig, enableValidation} from './validate.js';
import {openPopup, closePopup, handleProfileFormSubmit, closeByOverlay, handleAvatarFormSubmit} from './modal.js';
import {config, getAllCards, onResponce, addCards, removeCard, getInfo, editProfile, getUserInfo, editAvatar} from './api.js'

let userID = null;


getInfo()
  .then(([data, user]) => {
    console.log(data);
    console.log(user);
    name.textContent = user.name;
    about.textContent = user.about;
    avatar.src = user.avatar;
    userID = user._id;
    console.log(user._id);
    data.reverse().forEach((item) => {
      renderCard(item, cardsList, userID)
    })
  })
  .catch((err) => {
    console.log(err);
  })

//редактирование профиля
function editProfileInfo() {
  loading(profileSubmitBtn, true)
  editProfile({
    name: nameInput.value,
    about: aboutInput.value
  })
    .then(() => {
      getInfo()
        .then(() => {
          console.log('Данные пользователя обновлены'); //без then webstorm ругается на проигнорированный промис
        })
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => loading(profileSubmitBtn, false))
}

//редактирование аватара
function editNewAvatar() {
  loading(avatarSubmitBtn, true)
  editAvatar({
    avatar: avatarLinkInput.value
  })
    .then(() => {
      getUserInfo()
        .then(() => {
          console.log('Аватар обновлён')
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => loading(avatarSubmitBtn, false))
}

const btnAvatar = document.querySelector('.profile__avatar-button'),
  popupAvatar = document.querySelector('.popup__avatar'),
  btnCloseAvatarEdit = document.querySelector('.popup__close_avatar');

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

formAvatarEdit.addEventListener('submit', handleAvatarFormSubmit)

//меняем текст на кнопке, пока вносятся изменения
function loading (button, load) {
  if (load) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = 'Сохранить';
  }
}


enableValidation(validationConfig);

export {userID, editProfileInfo, editNewAvatar, loading}
