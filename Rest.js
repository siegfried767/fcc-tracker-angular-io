import { Injectable, ViewContainerRef } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  RequestOptions
} from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { JWTService } from './jwt.service';

@Injectable()
export class RestService {
  private _error: boolean = false;
  private _errorMsg: string = '';

  constructor(
    private http: Http,
    private router: Router,
    private jwt: JWTService
  ) {}

  /**
   * Getter for error
   * @return {boolean} [readonly]
   */
  get error(): boolean {
    return this._error;
  }

  /**
   * Getter for error msg
   * @return {string} [readonly]
   */
  get errorMsg(): string {
    return this._errorMsg;
  }

  /**
   * Abstracts HTTP POST
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  post(url: string, body?: any): Promise<any> {
    return this.http
      .post(url, body, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));
  }

  /**
   * Abstracts HTTP GET
   * @param  {string}       url
   * @return {Promise<any>}
   */
  get(url: string): Promise<any> {
    return this.http
      .get(url, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));
  }

  /**
   * Abstracts HTTP DELETE
   * @param  {string}       url
   * @return {Promise<any>}
   */
  delete(url: string): Promise<any> {
    return this.http
      .delete(url, this.buildOptions())
      .toPromise()
      .catch(err => this.handleError(err));
  }

  /**
   * Abstracts HTTP PUT
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  put(url: string, body: any): Promise<any> {
    return this.http
      .put(url, body, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));
  }

  /**
   * Lets use set build options with auth token header on abstracted HTTP calls
   * @return {RequestOptionsArgs}
   */
  buildOptions(): RequestOptionsArgs {
    this._error = false;
    this._errorMsg = '';

    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Bearer ' + this.jwt.checkToken());
    return options;
  }

  /**
   * Error handling for all abstracted calls, doesn't reject a Promise
   * @param  {any}          serverError
   */
  handleError(serverError: any): void {
    this._error = true;
    this._errorMsg = JSON.parse(serverError._body).message;
    console.log('Caught', this.errorMsg);
    this.router.navigate(['/login']);
  }
}
