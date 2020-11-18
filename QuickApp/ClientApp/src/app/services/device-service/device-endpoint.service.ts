import {EndpointBase} from '../endpoint-base.service';
import {Injectable} from '@angular/core';

import { ConfigurationService } from '../configuration.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class DeviceEndpointService extends EndpointBase {
  private readonly _deviceUrl: string = '/api/device/device';
  private readonly _devicesUrl: string = '/api/device/devices';
  private readonly _devicelpUrl: string = '/api/device/deviceslp';

  get deviceUrl() { return this.configurations.baseUrl + this._deviceUrl; }
  get devicesUrl() { return this.configurations.baseUrl + this._devicesUrl; }
  get devicelpUrl() { return this.configurations.baseUrl + this._devicelpUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getDeviceEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = id > 0 ? `${this.deviceUrl}/${id}` : this.devicesUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeviceEndpoint(id));
      }));
  }

  getNewDeviceEndpoint<T>(deviceObject: any): Observable<T> {

    return this.http.post<T>(this.deviceUrl, JSON.stringify(deviceObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getNewDeviceEndpoint(deviceObject));
      }));
  }

  getUpdateDeviceEndpoint<T>(deviceId: number, deviceObject: any): Observable<T> {
    // const endpointUrl = deviceId ? `${this.deviceUrl}/${deviceId}` : this.deviceUrl;
    const endpointUrl = `${this.deviceUrl}/${deviceId}`;

    return this.http.put<T>(endpointUrl, JSON.stringify(deviceObject), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getUpdateDeviceEndpoint(deviceObject, deviceId));
      }));
  }

  getDeleteDeviceEndpoint<T>(deviceId: number): Observable<T> {
    const endpointUrl = `${this.deviceUrl}/${deviceId}`;
    return this.http.delete<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeleteDeviceEndpoint(deviceId));
      })
    );
  }

  getDeviceLinkPoolEndpoint<T>(id?: number): Observable<T> {
    const endpointUrl = id > 0 ? `${this.devicelpUrl}/${id}` : this.devicesUrl;

    return this.http.get<T>(endpointUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getDeviceLinkPoolEndpoint(id));
      }));
  }

}
