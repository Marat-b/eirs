import {Component, Inject, OnInit} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-device-volume-dialog',
  templateUrl: './device-volume-dialog.component.html',
  styleUrls: ['./device-volume-dialog.component.scss']
})
export class DeviceVolumeDialogComponent implements OnInit {
  device: DeviceModel;

  constructor(public dialogRef: MatDialogRef<DeviceModel>,
              @Inject(MAT_DIALOG_DATA) public data: {device: DeviceModel}) {
    this.device = this.data.device;
  }

  ngOnInit() {
  }

}
