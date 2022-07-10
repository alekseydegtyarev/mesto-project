import '../pages/index.css'; // добавьте импорт главного файла стилей

import {updLikeState} from './card.js';
import {profileBtnEdit, popupProfile, btnCloseProfile, popupPlace, btnClosePlace, imgZoomCloseBtn, name, about,
  nameInput, aboutInput, formInfoEdit, addPlaceBtn, placeNameInput, placeLinkInput, templateCard, cardsList, popupImgZoom,
  imgZoomed, imgCaption, formAddPlace, addPlaceSubmitBtn, changeInfoBtn, avatar, formAvatarEdit, avatarLinkInput, avatarSubmitBtn, profileSubmitBtn, setUserInfo, loading} from './utils.js';
import {validationConfig, enableValidation} from './validate.js';
import {openPopup, addProfileToInput, closePopup, handleEsc, closeByOverlay, handleClickBtnZoom} from './modal.js';
import {
  config,
  getAllCards,
  onResponce,
  addCards,
  removeCard,
  getInfo,
  editProfile,
  getUserInfo,
  editAvatar,
  likeCard
} from './api.js'

let userID = null;


getInfo()
  .then(([data, user]) => {
    setUserInfo({
      userName: user.name,
      userAbout: user.about,
      userAvatar: user.avatar
    })
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
    .then((data) => {
      setUserInfo({
        userName: data.name,
        userAbout: data.about
      })
      closePopup(popupProfile)
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
        .then((data) => {
          setUserInfo({
            userAvatar: data.avatar
          })
          closePopup(popupAvatar)
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


//переключение лайка
const handleChangeLikeStatus = (card, cardID, isLiked) => {
  likeCard(cardID, isLiked)
    .then((data) => {
      updLikeState(card, data.likes, userID)
    })
    .catch((err) => {
      console.log(err)
    })
}

//добавление стартовых карточек из массива при загрузке страницы
const initiateCard = function(cardElement, userID, handleChangeLikeStatus) {
  const card = templateCard.content.cloneNode(true).querySelector('.cards__card'), //помещаем в переменную темплэйт клонированием всего содержимого
    image = card.querySelector('.cards__image'), //изображение внутри клонированного темплэйта
    cardHeader = card.querySelector('.cards__header'), //заголовок карточки
    btnDelete = card.querySelector('.cards__delete'), //кнопка удаления
    like = card.querySelector('.cards__like'), //лайк на карточке
    likeSum = card.querySelector('.cards__like-sum');


  cardHeader.textContent = cardElement.name;
  image.src = cardElement.link;
  image.alt = cardElement.name;

  updLikeState(card, cardElement.likes, userID)

  if (cardElement.owner._id !== userID) {
    btnDelete.remove();
  }

  btnDelete.addEventListener('click', (evt) => {
    removeCard(cardElement._id)
      .then(() => {
        evt.target.closest('.cards__card').remove();
      })
      .catch((err) => {
        console.log(err);
      })
  });
  like.addEventListener('click', () => {
    handleChangeLikeStatus(card, cardElement._id, like.classList.contains('cards__like_active'))
  });
  image.addEventListener('click', handleClickBtnZoom);
  return card; // https://efim360.ru/javascript-operator-return/
}

//сделано по аналогии с вебинаром
const renderCard = function(data, container, userID) {
  const card = initiateCard(data, userID, handleChangeLikeStatus);
  container.prepend(card);
}

function addCard() {
  loading(addPlaceSubmitBtn, true)
  //изменение свойств name и link для "cardElement" объявляем переменную, помещаем в неё изменяемые свойства
  //переменную используем в качестве аргумента для функции initiateCard
  const parameters = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  addCards(parameters)
    .then((res) => {
      renderCard(res, cardsList, userID)
      closePopup(popupPlace);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => loading(addPlaceSubmitBtn, false))
}



formAddPlace.addEventListener('submit', function (evt) {
  // evt.preventDefault();
  addCard();
  evt.target.reset();
  inactivateButton(addPlaceSubmitBtn);
  // location.reload() //никак не могу понять, почему карточка не рендерится сразу, а только после обновления страницы
});

const inactivateButton = function (button) {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}

//сохранение текста из инпутов на страницу, часть кода с комментариями взята из тз, комментарии практикума частично сохранены
//upd вынес объявление переменных в начало файла
// Находим форму в DOM
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  editProfileInfo();
  // Получите значение полей aboutInput и nameInput из свойства value
  closePopup(popupProfile);
}

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  editNewAvatar();
}

//закрытие попапа с зумом картинки
imgZoomCloseBtn.addEventListener('mousedown', () => closePopup(popupImgZoom));


enableValidation(validationConfig);
