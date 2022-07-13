/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { merge, isEmpty } from 'lodash-es';
import TokenStorage from '../../helpers/TokenStorage';
import { Auth } from '../../api/models/Auth/auth.model';
import REQUEST_OPTIONS from './Options';

const envApiUrl = process.env.REACT_APP_API_URL;

const apiUrl = envApiUrl;

export interface TokenRequest {
  username: string;
  password: string;
}

export interface Params {
  [key: string]: string | number | undefined;
}

class ApiService {
  API_URL: string;

  URL: string;

  constructor(path = '') {
    this.API_URL = `${apiUrl}`;
    this.URL = `${this.API_URL}/${path}/`;
  }

  /**
   * Creates a generic get request for specified URL.
   *
   * @param  {string} url (eg: get /questions/types)
   * @return {Promise<AxiosResponse>}
   */
  get(
    url: string,
    params: Params = {},
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.GET,
      options
    );

    let additionalParams = '';

    if (!isEmpty(params)) {
      additionalParams = `/?${this.parseParams(params)}`;
    }

    return this.send(
      `${this.API_URL}/${url}${additionalParams}`,
      requestOptions
    );
  }

  /**
   * Creates a generic post request for specified URL.
   *
   * @param  {string} url
   * @return {Promise<AxiosResponse>}
   */
  post(
    url: string,
    data: any = {},
    options: AxiosRequestConfig = {},
    params: Params = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.POST,
      options,
      { data }
    );
    let additionalParams = '';

    if (!isEmpty(params)) {
      additionalParams = `/?${this.parseParams(params)}`;
    }
    return this.send(
      `${this.API_URL}/${url}${additionalParams}`,
      requestOptions
    );
  }

  /**
   * Creates a generic patch request for specified URL.
   *
   * @param  {string} url
   * @return {Promise<AxiosResponse>}
   */
  patch(
    url: string,
    data: any = {},
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.PATCH,
      options,
      { data }
    );

    return this.send(`${this.API_URL}/${url}`, requestOptions);
  }

  /**
   * Creates a generic put request for specified URL.
   *
   * @param  {string} url
   * @return {Promise<AxiosResponse>}
   */
  put(
    url: string,
    data: any = {},
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.PUT,
      options,
      { data }
    );
    return this.send(`${this.API_URL}/${url}`, requestOptions);
  }

  /**
   * Creates a generic post request for specified URL.
   *
   * @param  {string} url
   * @return {Promise<AxiosResponse>}
   */
  delete(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.DELETE,
      options
    );
    return this.send(`${this.API_URL}/${url}`, requestOptions);
  }

  /**
   * Creates login request for oauth2 api.
   *
   * @param  {TokenRequest} body
   * @return {Promise<AxiosResponse>}
   */
  getToken({ username, password }: TokenRequest): Promise<AxiosResponse> {
    const data = {
      username,
      password,
    };

    const requestOptions: AxiosRequestConfig = merge({}, REQUEST_OPTIONS.POST, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.send(`${this.API_URL}/token`, requestOptions);
  }

  /**
   * Creates a refresh token request for oauth2 api.
   *
   * @return {Promise<AxiosResponse>}
   */
  refreshToken(): Promise<AxiosResponse> | any {
    const auth = TokenStorage.get();
    if (auth?.refresh) {
      const data = {
        refresh: auth.refresh,
      };

      const requestOptions: AxiosRequestConfig = merge(
        {},
        REQUEST_OPTIONS.POST,
        {
          data,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return this.send(`${this.API_URL}/token/refresh`, requestOptions);
    } else {
      return null;
    }
  }

  /**
   * Revokes authentication
   * @returns {Promise<AxiosResponse>}
   */
  revokeToken(options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.POST,
      options
    );
    return this.send(`${this.API_URL}/revokeToken`, requestOptions);
  }

  /**
   * Creates a get request for list of resources.
   *
   * @return {Promise<AxiosResponse>}
   */
  index(
    params: Params = {},
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.GET,
      options
    );
    let additionalParams = '';

    if (!isEmpty(params)) {
      additionalParams = `?${this.parseParams(params)}`;
    }

    return this.send(`${this.URL}${additionalParams}`, requestOptions);
  }

  /**
   * Creates a get request for a single resource.
   *
   * @param  {string | number} id
   * @return {Promise<AxiosResponse>}
   */
  show(
    id: string | number,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.GET,
      options
    );
    return this.send(`${this.URL}/${id}`, requestOptions);
  }

  /**
   * Creates a post request for resource creation.
   *
   * @param  {object} data
   * @return {Promise<AxiosResponse>}
   */
  create(data: Record<string, unknown>, options = {}): Promise<AxiosResponse> {
    const requestOptions = merge({}, REQUEST_OPTIONS.POST, options, {
      data,
    });
    return this.send(this.URL, requestOptions);
  }

  /**
   * Creates a put request for resource updates.
   *
   * @param  {string | number} id
   * @param  {Record<string, unknown>} data
   * @return {Promise<AxiosResponse>}
   */
  update(
    id: string | number,
    data: Record<string, unknown>,
    options = {}
  ): Promise<AxiosResponse> {
    const requestOptions = merge({}, REQUEST_OPTIONS.PUT, options, {
      data,
    });

    return this.send(`${this.URL}/${id}`, requestOptions);
  }

  /**
   * Creates a delete request for single resource.
   *
   * @param  {string | number} id
   * @return {Promise<AxiosResponse>}
   */
  // TODO rename to 'delete' kinds of name
  // if you change this name remember change all api.destroy calls name with the new name
  destroy(
    id: string | number,
    options: AxiosRequestConfig = {},
    params: Params = {}
  ): Promise<AxiosResponse> {
    const requestOptions: AxiosRequestConfig = merge(
      {},
      REQUEST_OPTIONS.DELETE,
      options
    );
    // return this.send(`${this.URL}/${id}`, requestOptions); // Old api return

    /**
     * additionalParams needs for #486
     */
    let additionalParams = '';

    if (!isEmpty(params)) {
      additionalParams = `?${this.parseParams(params)}`;
    }
    return this.send(`${this.URL}/${id}${additionalParams}`, requestOptions);
  }

  /**
   * Adds access token to request if any token exist on storage.
   *
   * @param  {object} request options
   * @return {object} modified options
   */
  addTokenToRequest = (options: AxiosRequestConfig): AxiosRequestConfig => {
    const auth: Auth | null = TokenStorage.get();

    if (auth?.access) {
      options.headers.Authorization = `Bearer ${auth.access}`;
    }

    return options;
  };

  /**
   * Creates form encoded body.
   *
   * @param  {any} params
   * @return {string}
   */
  parseParams = (params: Params = {}): string =>
    Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

  /**
   * Generates a promise which sends request to server with given paremeters.
   *
   * @param  {string} url
   * @param  {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse>}
   */
  send(url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    const fullOptions: AxiosRequestConfig = this.addTokenToRequest(options);
    fullOptions.url = `${url}${url.includes('?') ? '' : '/'}`;

    fullOptions.headers = {
      ...fullOptions.headers,
    };
    return new Promise(
      (resolve, reject) =>
        axios(fullOptions)
          .then((res) => {
            if (res.status < 400) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          })
      // TODO: Add general error handling for statuses like 500 etc
    );
  }
}

export default ApiService;
