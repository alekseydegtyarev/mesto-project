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
    formAddPlace = document.querySelector('.form_add-place'); //форма добавления карточек

// функция открытия поп-апа. вместо popup в слушателях кнопок нужно будет указывать объявленные выше переменные конкретных попапов
function openPopup(popup) {
  popup.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
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

//удаление карточки
const handleClickBtnDelete = function(evt) {
  evt.target.closest('.cards__card').remove();
}

//лайк
const handleClickBtnLike = function (evt) {
  evt.target.closest('.cards__like').classList.toggle('cards__like_active');
}

//открытие попапа с зумом картинки

const handleClickBtnZoom = function(element) {
  openPopup(popupImgZoom); //добавляем класс, чтобы попап был виден

  imgZoomed.src = element.target.src;
  imgZoomed.alt = element.target.alt;
  imgCaption.textContent = element.target.alt;
}

//закрытие попапа с зумом картинки
imgZoomCloseBtn.addEventListener('click', () => closePopup(popupImgZoom));

//добавление 6 стартовых карточек из массива при загрузке страницы
//добавление карточек должно быть после объявления функций, на которые внутри ссылаются слушатели событий
const initiateCard = function(cardElement) {
  // cardElement.preventDefault();
  const card = templateCard.content.cloneNode(true), //помещаем в переменную темплэйт клонированием всего содержимого
    image = card.querySelector('.cards__image'), //изображение внутри клонированного темплэйта
    cardHeader = card.querySelector('.cards__header'), //заголовок карточки
    btnDelete = card.querySelector('.cards__delete'), //кнопка удаления
    like = card.querySelector('.cards__like'); //лайк на карточке

  cardHeader.textContent = cardElement.name; //помещаем в заголовок карточки значение инпута с названием
  image.src = cardElement.link; //в атрибут src помещаем значение ссылки из инпута
  image.alt = cardElement.name; //в alt помещаем название из инпута

  btnDelete.addEventListener('click', handleClickBtnDelete); //при добавлении новых элементов на страницу
  like.addEventListener('click', handleClickBtnLike); //слушатель для лайка
  image.addEventListener('click', handleClickBtnZoom);

  return card; // https://efim360.ru/javascript-operator-return/
}

//сделано по аналогии с вебинаром
const renderCard = function(data, container) {
  const card = initiateCard(data);
  container.prepend(card);
}

cards.forEach(function (item) {
  renderCard(item, cardsList)
})

//добавление дополнительных карточек
//переиспользование функции из инициализации карточек и добавить ".preventDefault()" тк при добавлении карточки страница обновляется
formAddPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard();
  closePopup(popupPlace);//закрытие формы при создании карточки
});


function addCard() {
  //изменение свойств name и link для "cardElement" объявляем переменную, помещаем в неё изменяемые свойства
  //переменную используем в качестве аргумента для функции initiateCard
  const parameters = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  renderCard(parameters, cardsList)
}

