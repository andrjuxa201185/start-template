export default class Auth {
  static getTokenFromLocalStorage() {
    try {
      return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    } catch (e) {
      localStorage.clear();
    }
  }
}
