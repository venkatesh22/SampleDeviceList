import { Component, OnInit } from '@angular/core';
import { DeviceListService } from '../../services/device-list.service';
import { DeviceListResponse, DeviceCap, Device } from '../../models/device-list.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  selectedAll: boolean = false;
  deviceList: Device[] = [];
  showReboot: boolean = false;
  showShutDown: boolean = false;
  showFirmware: boolean = false;
  showConfig: boolean = false;
  constructor(private deviceListService: DeviceListService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.deviceListService.getDeviceList().subscribe((response: DeviceListResponse) => {
      this.deviceList = response.search_results;
    });
  }

  selectAll() {
    this.deviceList.map((device) => {
      device.selected = this.selectedAll;
    });
    this.selectDevice();
  }

  selectDevice() {
    const devicesCapsList: DeviceCap[][] = [];
    this.deviceList.forEach((device) => {
      if (device.selected) {
        return devicesCapsList.push(device.device_cap);
      }
    });
    this.showReboot = false;
    this.showShutDown = false;
    this.showFirmware = false;
    this.showConfig = false;

    this.showReboot = this.shouldShowCapability(devicesCapsList, 'reboot');
    this.showShutDown = this.shouldShowCapability(devicesCapsList, 'shutdown');
    this.showFirmware = this.shouldShowCapability(devicesCapsList, 'firmware');
    this.showConfig = this.shouldShowCapability(devicesCapsList, 'config');
  }

  public shouldShowCapability(devicesCapsList: DeviceCap[][], feature: string) {
    const devicesCaps = [];
    devicesCapsList.forEach((deviceCaps: DeviceCap[]) => {
      deviceCaps.forEach((cap) => {
        if (cap.feature === feature && cap.product_family) {
          devicesCaps.push(cap.product_family);
        }
      });
    });
    return devicesCaps.length > 0 && devicesCaps.every( v => v === devicesCaps[0]) && devicesCaps.length === devicesCapsList.length;
  }

  public showFamily(device: Device, feature: string) {
    return device.device_cap.find((cap) => cap.feature === feature).product_family;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
