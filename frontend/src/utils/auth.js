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
      credentials: 'include',
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
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      const test = this._checkResponse(res)
      //console.log(test);
      return test
    })
  };

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
    })
    .then((res) => {
      const test = this._checkResponse(res)
      // console.log(test);
      return test
    })
  };

}

export const auth = new Auth();
