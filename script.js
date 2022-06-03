const profileBtnEdit = document.querySelector('.profile__button-edit'), // кнопка редактирования профиля
    popupProfile = document.querySelector('.popup__profile'), //окно редактирования профиля
    btnCloseProfile = document.querySelector('.popup__close_profile'), //кнопка закрытия окна редактирования профиля
    popupPlace = document.querySelector('.popup__new-place'), //попап окна добавления "мест"
    btnClosePlace = document.querySelector('.popup__close_place'); //кнопка закрытия окна добавления мест
    btnCloseZoom = document.querySelector('.popup__close_img-zoom') //кнопка закрытия увеличенной картинки
    cardImg = document.querySelector('.cards__image');

// функция открытия поп-апа редактирования профиля
function profileEdit() {
  popupProfile.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
//кладём в инпуты текущие значения со страницы
  let nameInput = document.querySelector('.popup__input-edit_name'), //присваиваем
    jobInput = document.querySelector('.popup__input-edit_about'), //переменные
    name = document.querySelector('.profile__name'), //элементам
    job = document.querySelector('.profile__about'); //страницы
//в "значение"(value) инпутов кладём текущий текст со страницы
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

//при нажатии на кнопку с карандашом открываем поп-ап
profileBtnEdit.addEventListener('click', profileEdit);

//////////////////////

//сохранение текста из инпутов на страницу, часть кода с комментариями взята из тз, комментарии практикума сохранены
// Находим форму в DOM
const formInfoEdit = document.querySelector('.form_info-edit') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input-edit_name') // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input-edit_about')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
  function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let job = document.querySelector('.profile__about');// Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('.profile__name');

    job.textContent = jobInput.value;
    name.textContent = nameInput.value;// Вставьте новые значения с помощью textContent
    popupProfile.classList.remove('popup_opened');
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formInfoEdit.addEventListener('submit', formSubmitHandler);

//////////////////////

//закрытие формы редактирования профиля со сбросом (нажатие Х)
function formReset() {
  document.querySelector('.form_info-edit').reset(); //сбрасываем значения в форме
  popupProfile.classList.remove('popup_opened'); //убираем видимость попапа, удалив ему класс с видимостью
}

btnCloseProfile.addEventListener('click', formReset);

//////////////////////

//открытие попапа для добавления карточек

function openCardsEditor() {
  let popupAddCards = document.querySelector('.popup__new-place'); //выбираем попап добавления карточки
  popupAddCards.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
}

//присваиваем кнопке "+" переменную
let AddPlaceBtn = document.querySelector('.profile__button-add');

//при нажатии на кнопку с "+" открываем поп-ап добавления карточек
AddPlaceBtn.addEventListener('click', openCardsEditor);

//закрытие формы редактирования профиля со сбросом (нажатие Х)
function formResetPlace() {
  document.querySelector('.form_add-place').reset(); //сбрасываем значения в форме
  popupPlace.classList.remove('popup_opened'); //убираем видимость попапа, удалив ему класс с видимостью
}

btnClosePlace.addEventListener('click', formResetPlace);

//////////////////////

//добавление карточек

function addCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let placeNameInput = document.querySelector('.popup__input-edit_place').value; //значение названия в инпуте
  let placeLinkInput = document.querySelector('.popup__input-edit_link').value; //ссылка на картинку в инпуте
  let templateCard = document.querySelector('.template-card'); //темплэйт в конце html
  let card = templateCard.content.cloneNode(true); //помещаем в переменную темплэйт клонированием всего содержимого
  let image = card.querySelector('.cards__image'); //изображение внутри клонированного темплэйта
  let cardsList = document.querySelector('.cards__list'); //список карточек
  let cardHeader = card.querySelector('.cards__header'); //заголовок карточки

  cardHeader.textContent = placeNameInput; //помещаем в заголовок карточки значение инпута с названием
  image.src = placeLinkInput; //в атрибут src помещаем значение ссылки из инпута
  image.alt = placeNameInput; //в alt помещаем название из инпута
  cardsList.prepend(card); //помещаем новую карточку, созданную в темплэйте, в начало списка карточек
  popupPlace.classList.remove('popup_opened');//закрытие формы при создании карточки
}

const formAddPlace = document.querySelector('.form_add-place');
formAddPlace.addEventListener('submit', addCard);

//////////////////////

//открытие попапа с зумом картинки

const popupImgZoom = document.querySelector('.popup__img-zoom');

function zoomingImg(element) {
  popupImgZoom.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
//кладём в инпуты текущие значения со страницы
  const imgZoomed = document.querySelector('.popup__img-zoomed'), //присваиваем
    imgCaption = document.querySelector('figcaption'); //переменные

  imgZoomed.src = element.target.src;
  imgCaption.textContent = element.closest(document.querySelector('.cards__header')).textContent;

  console.log(cardImg);
}

cardImg.addEventListener('click', zoomingImg);

//закрытие попапа с зумом картинки

const imgZoomCloseBtn = document.querySelector('.popup__close_img-zoom');

function popupZoomClose() {
  popupImgZoom.classList.remove('popup_opened');
}

imgZoomCloseBtn.addEventListener('click', popupZoomClose);

//////////////////////

const btnDelete = document.querySelector('.cards__delete');

const handleClickBtnDelete = function(evt) {
  const target = evt.target;
  console.log(target);
  const card = target.closest('.cards__card');
  card.remove();
}

btnDelete.addEventListener('click', handleClickBtnDelete)
//////////////////////

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addStartCards(name, link) {

}
