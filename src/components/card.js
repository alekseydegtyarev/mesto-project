
//проверка наличия лайка
const isLiked = (likesArr, userID) => {
  return Boolean(likesArr.find((likeObj) => {
    return likeObj._id === userID;
  }))
}

//обновление состояния лайка
const updLikeState = (cardElement, likesArr, userID) => {
  const like = cardElement.querySelector('.cards__like');
  const likeSum = cardElement.querySelector('.cards__like-sum');

  likeSum.textContent = likesArr.length;

  if (isLiked(likesArr, userID)) {
    like.classList.add('cards__like_active');
  }
  else {
    like.classList.remove('cards__like_active');
  }
}

export {isLiked, updLikeState}
