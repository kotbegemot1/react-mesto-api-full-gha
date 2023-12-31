import {apiConfig} from './utils'
// console.log(apiConfig);

class Api {
  constructor(apiConfig){
    this._url = apiConfig.groupUrl;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
    })
      .then(res => this._checkResponse(res))
  };

  editUserInfo({name, about}) {
    //console.log(name, about);
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    //console.log(isLiked);
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
      })
      .then(res => this._checkResponse(res))
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
      })
      .then(res => this._checkResponse(res))
    }
  }

  updateUserAvatar(link) {
    // console.log(avatar.avatar);
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: link.avatar,
      })
    })
    .then(res => this._checkResponse(res))
  }
}

export const api = new Api(apiConfig);
