const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: '5bf713e9-acbe-4f0a-a6b5-e903f3a3d6df',
    "Content-type": 'application/json'
  }
}

function onResponce(res) {
  // console.log(res);
  return res.ok ? res.json() : Promise.reject('Сервер недоступен')
}

function getAllCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
    .then(onResponce)
}

function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    method: "GET",
    headers: config.headers
  })
    .then(onResponce)
}

function getInfo() {
  return Promise.all([getAllCards(), getUserInfo()])
}

function addCards(data) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}

function editProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}

function editAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(onResponce)
}

function removeCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(onResponce)
}

function likeCard(cardId, isLiked) {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
    .then(onResponce)
}

export {config, getAllCards, onResponce, addCards, removeCard, likeCard, getInfo, editProfile, getUserInfo, editAvatar}
