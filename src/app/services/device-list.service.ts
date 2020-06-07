import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DeviceListResponse } from '../models/device-list.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  url: string = './assets/devicelist.json';
  constructor(private http: HttpClient) {
  }

  getDeviceList(): Observable<DeviceListResponse> {
    return this.http.get<DeviceListResponse>(this.url);
  }

}
