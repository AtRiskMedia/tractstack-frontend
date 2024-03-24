import axios from "axios";
import type { AxiosError } from "axios";

import type { IAxiosClientProps } from "../types";

/* eslint-disable  @typescript-eslint/no-explicit-any */
let failQueue: any[] = [];
let isRefreshing = false;

const processQueue = (error: AxiosError | null) => {
  failQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failQueue = [];
};

export function createAxiosClient({
  options,
  getCurrentAccessToken,
  refreshTokenUrl,
  setRefreshedTokens,
  getAuthData,
  logout,
}: IAxiosClientProps) {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config: any) => {
      if (config.authorization !== false) {
        const token = getCurrentAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ` + token;
          config.withCredentials = true;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const originalRequest = error.config;
      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {})
      );
      console.log(`had error`);

      const handleError = (error: AxiosError) => {
        processQueue(error);
        return Promise.reject(error);
      };

      if (
        refreshTokenUrl &&
        error.response?.status === 401 &&
        originalRequest?.url !== refreshTokenUrl &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failQueue.push({ resolve, reject });
          })
            .then(() => {
              return client(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }
        isRefreshing = true;
        originalRequest._retry = true;
        const authPayload = getAuthData();
        console.log(`ready for refresh?`);
        return client
          .post(refreshTokenUrl, authPayload)
          .then(response => {
            console.log(`ok -- must store new tokens`);
            setRefreshedTokens(response.data);
            processQueue(null);
            return client(originalRequest);
          }, handleError)
          .catch(e => {
            console.log(`bad`);
            logout(true);
            return handleError(e);
          })
          .finally(() => {
            console.log(`done`);
            isRefreshing = false;
          });
      } else if (error.response?.status === 401) {
        logout();
        return handleError(error);
      }

      return Promise.reject(error);
    }
  );

  return client;
}
