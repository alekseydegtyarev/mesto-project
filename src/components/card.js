import {
  popupPlace,
  imgZoomCloseBtn,
  placeNameInput,
  placeLinkInput,
  templateCard,
  cardsList,
  popupImgZoom,
  imgZoomed,
  imgCaption,
  formAddPlace,
  addPlaceSubmitBtn,
  avatarSubmitBtn
} from './utils.js';
import {handleClickBtnZoom, closePopup,} from './modal.js';
import {validationConfig} from './validate.js'
import {config, getAllCards, onResponce, addCards, removeCard, likeCard} from './api.js'
import {userID, loading} from './index.js'
import {logPlugin} from "@babel/preset-env/lib/debug";


// const volcano = new URL('../images/volcano-optimised.jpg', import.meta.url);
// const tuman = new URL('../images/tuman-optimised.jpg', import.meta.url);
// const river = new URL('../images/river-optimised.jpg', import.meta.url);
// const road = new URL('../images/road.jpg', import.meta.url);
// const singapore = new URL('../images/singapore.jpg', import.meta.url);
// const ship = new URL('../images/ship.jpg', import.meta.url);
// import arkhyz from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
// import chelyabinsk from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
// import ivanovo from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
// import kamchatka from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
// import kholmogorsky from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
// import baikal from 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';

// const cards = [
//   {
//     name: 'Корякский вулкан',
//     link: volcano
//   },
//   {
//     name: 'Полянка :)',
//     link: tuman
//   },
//   {
//     name: 'Река Камчатка',
//     link: river
//   },
//   {
//     name: 'Дорога в горах',
//     link: road
//   },
//   {
//     name: 'Сингапур',
//     link: singapore
//   },
//   {
//     name: 'Шхуна в бухте Моржовая, Камчатка',
//     link: ship
//   }
// ];

//проверка наличия лайка
const isLiked = (likesArr, userID) => {
  return Boolean(likesArr.find((likeObj) => {
    return likeObj._id === userID;
  }))
}

//обновление состояния лайка
const updLikeState = (cardElement, likesArr, userID) => {
    const like = cardElement.querySelector('.cards__like'),
    likeSum = cardElement.querySelector('.cards__like-sum');

  likeSum.textContent = likesArr.length;

  if(isLiked(likesArr, userID)) {
    like.classList.add('cards__like_active');
  }
  else {
    like.classList.remove('cards__like_active');
  }
}

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

// const handleClickBtnLike = function (evt) {
//   evt.target.classList.toggle('cards__like_active')
// }



//закрытие попапа с зумом картинки
imgZoomCloseBtn.addEventListener('mousedown', () => closePopup(popupImgZoom));

//добавление стартовых карточек из массива при загрузке страницы
const initiateCard = function(cardElement, userID, handleChangeLikeStatus) {
  const card = templateCard.content.cloneNode(true), //помещаем в переменную темплэйт клонированием всего содержимого
    image = card.querySelector('.cards__image'), //изображение внутри клонированного темплэйта
    cardHeader = card.querySelector('.cards__header'), //заголовок карточки
    btnDelete = card.querySelector('.cards__delete'), //кнопка удаления
    like = card.querySelector('.cards__like'); //лайк на карточке


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



//добавление дополнительных карточек
//переиспользование функции из инициализации карточек и добавить ".preventDefault()" тк при добавлении карточки страница обновляется
formAddPlace.addEventListener('submit', function (evt) {
  // evt.preventDefault();
  addCard();
  evt.target.reset();
  closePopup(popupPlace);
  inactivateButton(addPlaceSubmitBtn);
  // location.reload() //никак не могу понять, почему карточка не рендерится сразу, а только после обновления страницы
});

const inactivateButton = function (button) {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
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
      renderCard(parameters, cardsList, userID)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => loading(addPlaceSubmitBtn, false))
}



export {handleClickBtnZoom, initiateCard, renderCard, addCard}
