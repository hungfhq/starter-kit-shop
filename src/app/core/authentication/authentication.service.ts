import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomService } from '@app/custom.service';
import SimpleCrypto from 'simple-crypto-js';

const secretKey = 'secret';
const simpleCrypto = new SimpleCrypto(secretKey);

export interface Credentials {
  // Customize received credentials here
  username: string;
  password: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  private _context: LoginContext | null;
  private data: Credentials | null;
  private service: CustomService;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    this._context = context;
    if (context.username !== '') {
      this.data = {
        username: context.username,
        password: context.password,
        token: '123456'
      };
      if (context.remember) {
        // this.setCookie('username', context.username, 1);
        // this.setCookie('password', context.password, 1);
        localStorage.setItem('rememberKey', JSON.stringify(context.remember));
      } else {
        // this.setCookie('username', '', 0);
        // this.setCookie('password', '', 0);
        localStorage.setItem('rememberKey', 'false');
      }
      this.setCredentials(this.data, context.remember);
    } else {
      this.data = {
        username: '',
        password: '',
        token: ''
      };
    }
    return of(this.data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    // this.setCredentials();
    if (localStorage.getItem('rememberKey')) {
      this.setCredentials(null, JSON.parse(localStorage.getItem('rememberKey')));
    } else {
      this.setCredentials();
    }
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  }

  getCookie(cname: string) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const encryptedCredentials: Credentials = {
        username: credentials.username,
        password: simpleCrypto.encrypt(credentials.password),
        token: credentials.token
      };
      const storage = remember ? localStorage : sessionStorage;
      // storage.setItem(credentialsKey, JSON.stringify(credentials));
      storage.setItem(credentialsKey, JSON.stringify(encryptedCredentials));
      storage.setItem('en_credentials', JSON.stringify(encryptedCredentials));
    } else {
      localStorage.removeItem(credentialsKey);
      localStorage.removeItem('wishlistLength');
      sessionStorage.clear();
      if (!remember) {
        localStorage.clear();
      }
    }
  }
}
