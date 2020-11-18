import { Injectable } from '@angular/core';
import {ConfigurationService} from '../configuration.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {EndpointBase} from '../endpoint-base.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkPoolEndpointService extends EndpointBase {
  private readonly _linkpoolUrl: string = '/api/linkpool/linkpool';
  private readonly _linkpoolsUrl: string = '/api/linkpool/linkpools';

  get linkpoolUrl() { return this.configurations.baseUrl + this._linkpoolUrl; }
  get linkpoolsUrl() { return this.configurations.baseUrl + this._linkpoolsUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getLinkPoolEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = id > 0 ? `${this.linkpoolUrl}/${id}` : this.linkpoolsUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getLinkPoolEndpoint(id));
      }));
  }

  getNewLinkPoolEndpoint<T>(linkpoolObject: any): Observable<T> {
    return this.http.post<T>(this.linkpoolUrl, JSON.stringify(linkpoolObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewLinkPoolEndpoint(linkpoolObject));
      }));
  }

  getUpdateLinkPoolEndpoint<T>(linkpoolId: number, linkpoolObject: any): Observable<T> {
    const endpointUrl = `${this.linkpoolUrl}/${linkpoolId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(linkpoolObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateLinkPoolEndpoint(linkpoolObject, linkpoolId));
      }));
  }

  getDeleteLinkPoolEndpoint<T>(linkpoolId: number): Observable<T> {
    const endpointUrl = `${this.linkpoolUrl}/${linkpoolId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteLinkPoolEndpoint(linkpoolId));
      })
    );
  }
}
