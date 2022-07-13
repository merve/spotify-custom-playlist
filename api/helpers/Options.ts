import { AxiosRequestConfig } from 'axios';

const REQUEST_OPTIONS: { [key: string]: AxiosRequestConfig } = {
  GET: {
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  },
  POST: {
    method: 'POST',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  PATCH: {
    method: 'PATCH',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  PUT: {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  DELETE: {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  },
};

export default REQUEST_OPTIONS;
