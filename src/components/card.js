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


//проверка наличия лайка
const isLiked = (cardElement, likesArr, userID) => {
  return Boolean(likesArr.find((likeObj) => {
    return likeObj._id === userID;
  }))
}

//обновление состояния лайка
const updLikeState = (cardElement, likesArr, userID) => {
    const like = cardElement.querySelector('.cards__like');
    const likeSum = cardElement.querySelector('.cards__like-sum');

  likeSum.textContent = likesArr.length;

  if (isLiked(cardElement, likesArr, userID)) {
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

//закрытие попапа с зумом картинки
imgZoomCloseBtn.addEventListener('mousedown', () => closePopup(popupImgZoom));

//добавление стартовых карточек из массива при загрузке страницы
const initiateCard = function(cardElement, userID, handleChangeLikeStatus) {
  const card = templateCard.content.cloneNode(true), //помещаем в переменную темплэйт клонированием всего содержимого
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
