import {popupPlace, imgZoomCloseBtn, placeNameInput, placeLinkInput, templateCard, cardsList, popupImgZoom, imgZoomed, imgCaption, formAddPlace} from './utils.js';
import {handleClickBtnZoom, closePopup} from './modal.js';

const volcano = new URL('../images/volcano-optimised.jpg', import.meta.url);
const tuman = new URL('../images/tuman-optimised.jpg', import.meta.url);
const river = new URL('../images/river-optimised.jpg', import.meta.url);
const road = new URL('../images/road.jpg', import.meta.url);
const singapore = new URL('../images/singapore.jpg', import.meta.url);
const ship = new URL('../images/ship.jpg', import.meta.url);
// import arkhyz from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// import chelyabinsk from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
// import ivanovo from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
// import kamchatka from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
// import kholmogorsky from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
// import baikal from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';

const cards = [
  {
    name: 'Корякский вулкан',
    link: volcano
  },
  {
    name: 'Полянка :)',
    link: tuman
  },
  {
    name: 'Река Камчатка',
    link: river
  },
  {
    name: 'Дорога в горах',
    link: road
  },
  {
    name: 'Сингапур',
    link: singapore
  },
  {
    name: 'Шхуна в бухте Моржовая, Камчатка',
    link: ship
  }
];

//удаление карточки
const handleClickBtnDelete = function(evt) {
  evt.target.closest('.cards__card').remove();
}

//лайк
const handleClickBtnLike = function (evt) {
  evt.target.closest('.cards__like').classList.toggle('cards__like_active');
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

export {cards, handleClickBtnDelete, handleClickBtnLike, handleClickBtnZoom, initiateCard, renderCard, addCard}
