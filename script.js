let profileBtnEdit = document.querySelector('.profile__button-edit'), // присваиваем переменную кнопке редактирования профиля
    popupProfile = document.querySelector('.popup_profile'), //переменная окна редактирования профиля
    btnCloseProfile = document.querySelector('.popup__close_profile'), //кнопка закрытия окна редактирования профиля
    popupPlace = document.querySelector('.popup_new-place'), //попап окна добавления "мест"
    btnClosePlace = document.querySelector('.popup__close_place'); //кнопка закрытия окна добавления мест

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

//закрытие формы редактирования профиля без сброса
// function formClose() {
//   popupProfile.classList.remove('popup_opened');
// }

// btnSave.addEventListener('click', formClose);

//закрытие формы редактирования профиля со сбросом (нажатие Х)
function formReset() {
  document.querySelector('.form_info-edit').reset();
  popupProfile.classList.remove('popup_opened');
}

btnCloseProfile.addEventListener('click', formReset);

//////////////////////

//открытие попапа для добавления карточек

function openCardsEditor() {
  let popupAddCards = document.querySelector('.popup_new-place');
  popupAddCards.classList.add('popup_opened'); //добавляем класс, чтобы попап был виден
}

//закрытие формы редактирования профиля со сбросом (нажатие Х)
function formResetPlace() {
  document.querySelector('.form_add-place').reset();
  popupPlace.classList.remove('popup_opened');
}

btnClosePlace.addEventListener('click', formResetPlace);

//присваиваем кнопке "+" переменную
let AddPlaceBtn = document.querySelector('.profile__button-add');

//при нажатии на кнопку с карандашом открываем поп-ап добавления картинок
AddPlaceBtn.addEventListener('click', openCardsEditor);

//////////////////////

//добавление карточек

function addCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let placeNameInput = document.querySelector('.popup__input-edit_place').value;
  let placeLinkInput = document.querySelector('.popup__input-edit_link').value;
  let templateCard = document.querySelector('.template-card');
  let card = templateCard.content.cloneNode(true);
  let image = card.querySelector('.cards__image');
  let cardsList = document.querySelector('.cards__list');
  let cardHeader = card.querySelector('.cards__header');

  cardHeader.textContent = placeNameInput;
  image.src = placeLinkInput;
  cardsList.prepend(card);
}


const formAddPlace = document.querySelector('.form_add-place');
formAddPlace.addEventListener('submit', addCard);

