import { Auth } from '../api/models/Auth/auth.model';

const tokenKeyword = 'auth';

export interface Token {
  access?: string;
  refresh?: string;
}

const TokenStorage = {
  get(): Auth | null {
    /*  const token = localStorage.getItem(tokenKeyword);

    if (token !== null) {
      return JSON.parse(token) as Auth;
    } */

    return null;
  },

  set(auth: Auth): void {
    /* const stringifiedToken = JSON.stringify(auth);
    return localStorage.setItem(tokenKeyword, stringifiedToken); */
  },

  destroy(): void {
    /*  localStorage.removeItem('auth'); */
  },

  /*  clear: (): void => localStorage.clear(), */
};

export default TokenStorage;
