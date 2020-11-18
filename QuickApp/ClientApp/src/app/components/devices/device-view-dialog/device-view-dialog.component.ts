import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeviceModel} from '../../../models/device.model';

@Component({
  selector: 'app-device-view-dialog',
  templateUrl: './device-view-dialog.component.html',
  styleUrls: ['./device-view-dialog.component.scss']
})
export class DeviceViewDialogComponent  {
  device: DeviceModel;
  overTime: number;

  constructor(public dialogRef: MatDialogRef<DeviceModel>,
              @Inject(MAT_DIALOG_DATA) public data: {device: DeviceModel, overTime: number}) {
    this.device = this.data.device;
    this.overTime = this.data.overTime;
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
