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
export class DeviceLinkPoolEndpointService extends EndpointBase {
  private readonly _deviceLinkpoolUrl: string = '/api/devicelinkpool/devicelinkpool';

  get devicelinkpoolUrl() { return this.configurations.baseUrl + this._deviceLinkpoolUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getDeviceLinkPoolEndpoint<T>(id: number): Observable<T> {
    const endpointUrl =  `${this.devicelinkpoolUrl}/${id}`;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeviceLinkPoolEndpoint(id));
      }));
  }

  getUpdateDeviceLinkPoolEndpoint<T>(devicesId: any, id: number): Observable<T> {
    const endpointUrl =  `${this.devicelinkpoolUrl}/${id}`;
    console.log('getUpdateDeviceLinkPoolEndpoint devicesId=' + JSON.stringify(devicesId));
    return this.http.put<T>(endpointUrl, JSON.stringify(devicesId), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateDeviceLinkPoolEndpoint(devicesId, id));
      }));
  }
}
