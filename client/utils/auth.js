/* setToken Fuction save in localstorage */

// Path: client/utils/auth.js
export const setToken = (token) => {
  window.localStorage.setItem('jwtToken', token);
};
