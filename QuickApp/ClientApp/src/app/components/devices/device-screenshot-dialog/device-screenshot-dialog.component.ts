import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeviceModel} from '../../../models/device.model';

@Component({
  selector: 'app-device-screenshot-dialog',
  templateUrl: './device-screenshot-dialog.component.html',
  styleUrls: ['./device-screenshot-dialog.component.scss']
})
export class DeviceScreenshotDialogComponent  {
  device: DeviceModel;

  constructor(public dialogRef: MatDialogRef<DeviceModel>,
              @Inject(MAT_DIALOG_DATA) public data: {device: DeviceModel}) {
    this.device = this.data.device;
  }

   cancel() {
    this.dialogRef.close(null);
  }

}
