import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {DeviceModel} from '../../../models/device.model';

@Component({
  selector: 'app-device-screenshot-sheet',
  templateUrl: './device-screenshot-sheet.component.html',
  styleUrls: ['./device-screenshot-sheet.component.scss']
})
export class DeviceScreenshotSheetComponent implements OnInit {
  device: DeviceModel;
  overTime: number;

  constructor(private bottomSheetRef: MatBottomSheetRef<DeviceModel>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {device: DeviceModel, overTime: number}) {
    this.device = this.data.device;
    this.overTime = this.data.overTime;
  }

  ngOnInit() {
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

}
