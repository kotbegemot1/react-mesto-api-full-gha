// import {apiConfig} from './utils'
// console.log(apiConfig);

class Auth {
  constructor(){
    this._url = 'https://api.last.sprint.students.nomoredomains.xyz';
    this._headers = {
      'Content-Type': 'application/json'
    }
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  Register(email, password) {
    //console.log(email, password);
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      const test = this._checkResponse(res)
      //console.log(test);
      return test
    })
  };

  Login(email, password) {
    //console.log(email, password);
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      const test = this._checkResponse(res)
      //console.log(test);
      return test
    })
  };

  checkToken(token) {
    // console.log('token');
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((res) => {
      const test = this._checkResponse(res)
      // console.log(test);
      return test
    })
  };

}

export const auth = new Auth();


