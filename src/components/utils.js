const profileBtnEdit = document.querySelector('.profile__button-edit'), // кнопка редактирования профиля
  popupProfile = document.querySelector('.popup__profile'), //окно редактирования профиля
  btnCloseProfile = document.querySelector('.popup__close_profile'), //кнопка закрытия окна редактирования профиля
  popupPlace = document.querySelector('.popup__new-place'), //попап окна добавления "мест"
  btnClosePlace = document.querySelector('.popup__close_place'), //кнопка закрытия окна добавления мест
  imgZoomCloseBtn = document.querySelector('.popup__close_img-zoom'), //кнопка закрытия увеличенной картинки
  // cardImg = document.querySelector('.cards__image'), //картинка в карточке
  name = document.querySelector('.profile__name'), //имя в профиле
  about = document.querySelector('.profile__about'), //"о себе" в профиле
  nameInput = document.querySelector('.popup__input-edit_name'), //инпут "имя"
  aboutInput = document.querySelector('.popup__input-edit_about'), //инпут "о себе"
  formInfoEdit = document.querySelector('.form_info-edit'), //форма редактирование информации о пользователе
  addPlaceBtn = document.querySelector('.profile__button-add'), //кнопка "+" для добавления карточек
  placeNameInput = document.querySelector('.popup__input-edit_place'), //значение названия в инпуте
  placeLinkInput = document.querySelector('.popup__input-edit_link'), //ссылка на картинку в инпуте
  templateCard = document.querySelector('.template-card'), //темплэйт в конце html
  cardsList = document.querySelector('.cards__list'), //список карточек
  popupImgZoom = document.querySelector('.popup__img-zoom'), //попап зума картинок
  imgZoomed = document.querySelector('.popup__img-zoomed'), //увеличенная картинка
  imgCaption = document.querySelector('.popup__img-zoom-caption'), //подпись к картинке в попапе
  formAddPlace = document.querySelector('.form_add-place'), //форма добавления карточек
  addPlaceSubmitBtn = formAddPlace.querySelector('.popup__save-button_place'),
  changeInfoBtn = formInfoEdit.querySelector('.popup__save-button_profile'),
  avatar = document.querySelector('.profile__avatar'),
  popupAvatar = document.querySelector('.popup__avatar'),
  formAvatarEdit = document.querySelector('.form_avatar-edit'),
  avatarLinkInput = formAvatarEdit.querySelector('.popup__input-edit_avatar-link'),
  avatarSubmitBtn = formAvatarEdit.querySelector('.popup__save-button_avatar'),
  profileSubmitBtn = formInfoEdit.querySelector('.popup__save-button_profile');

export {profileBtnEdit, popupProfile, btnCloseProfile, popupPlace, btnClosePlace, imgZoomCloseBtn, name, about,
  nameInput, aboutInput, formInfoEdit, addPlaceBtn, placeNameInput, placeLinkInput, templateCard, cardsList, popupImgZoom,
  imgZoomed, imgCaption, formAddPlace, addPlaceSubmitBtn, changeInfoBtn, avatar,formAvatarEdit, avatarLinkInput, avatarSubmitBtn, popupAvatar, profileSubmitBtn}
