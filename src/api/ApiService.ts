import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { defer, Observable as RxJsObservable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

export default class ApiService {
  /**
   * A wrapper method which does an HTTP request with the passed
   * Axios object and then returns a cold RxJS observable, which on
   * subscribe sends the request.
   */
  rxJsAxiosRequest(
    axios: AxiosInstance,
    config: AxiosRequestConfig
  ): RxJsObservable<AxiosResponse> {
    return defer(() => axios.request(config));
  }

  private axios = axios.create({
    baseURL:
      // "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage",
      "http://localhost:8080",
  });

  /**
   * Makes an API request.
   */
  request<T = any>(config: AxiosRequestConfig): RxJsObservable<T> {
    return this.rxJsAxiosRequest(this.axios, config).pipe(
      map((response) => response.data),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Makes a GET request
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): RxJsObservable<T> {
    return this.request({
      ...config,
      method: "GET",
      url,
    });
  }

  /**
   * Makes a POST request
   */
  post<T = any>(url: string, config?: AxiosRequestConfig): RxJsObservable<T> {
    return this.request({
      ...config,
      method: "POST",
      url,
    });
  }
}
