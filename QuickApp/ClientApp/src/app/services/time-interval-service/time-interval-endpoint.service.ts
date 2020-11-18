import { Injectable } from '@angular/core';
import {EndpointBase} from '../endpoint-base.service';
import {ConfigurationService} from '../configuration.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeIntervalEndpointService extends EndpointBase {
  private readonly _timeintervalUrl: string = '/api/timeinterval/timeinterval';

  get timeintervalUrl() { return this.configurations.baseUrl + this._timeintervalUrl; }


  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getTimeintervalEndpoint<T>(): Observable<T> {
    const endpointUrl = `${this.timeintervalUrl}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getTimeintervalEndpoint());
      }));
  }

  getUpdateTimeintervalEndpoint<T>(deviceObject: any): Observable<T> {
        const endpointUrl = `${this.timeintervalUrl}`;

        return this.http.put<T>(endpointUrl, JSON.stringify(deviceObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateTimeintervalEndpoint(deviceObject));
      }));
  }
}
