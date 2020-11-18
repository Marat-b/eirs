import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {DeviceService} from '../../../services/device-service/device.service';
import {Subscription} from 'rxjs';
import {MatBottomSheetRef, MatDialogRef} from '@angular/material';
import {DeviceVolumeDialogComponent} from '../device-volume-dialog/device-volume-dialog.component';
import {DeviceVolumeSheetComponent} from '../device-volume-sheet/device-volume-sheet.component';

@Component({
  selector: 'app-device-volume',
  templateUrl: './device-volume.component.html',
  styleUrls: ['./device-volume.component.scss']
})
export class DeviceVolumeComponent implements OnInit, OnDestroy {
  @Input() parent: any;
  // @Input() parentDialog: DeviceVolumeDialogComponent;
  @Input() device: DeviceModel = new DeviceModel();
  value = 0;
  name = '';
  address = ''
  subUpdateDevice: Subscription;

  constructor(private deviceService: DeviceService,
              private alertService: AlertService) { }

  ngOnInit() {
    console.log('volume=' + this.device.volume);
    this.value = this.device.volume;
    this.name = this.device.name;
    this.address = this.device.cityAddress;
  }

  ngOnDestroy(): void {
    if (this.subUpdateDevice) {
      this.subUpdateDevice.unsubscribe();
    }
  }

  public save() {
    this.device.volume = this.value;
    this.subUpdateDevice =  this.deviceService.updateDevice(this.device).subscribe(
      () => this.saveCompleted(this.device),
      error => this.saveFailed(error)
    );
    // this.parent.dialogRef.close(this.device);
  }

  private saveCompleted(device: DeviceModel) {
    console.log('--- saveCompleted  ----');
    /*if (device) {
      this.device = device;
       }*/
    console.log('saveCompleted device = ' + JSON.stringify(device));
    this.alertService.stopLoadingMessage();
    // this.resetForm();
    this.alertService.showMessage('Успешно!', 'Данные сохранены', MessageSeverity.success);
    // this.resetForm();
    if (this.parent instanceof DeviceVolumeDialogComponent) {
      this.parent.dialogRef.close(device);
    }
    if (this.parent  instanceof  DeviceVolumeSheetComponent) {
      this.parent.bottomSheetRef.dismiss(device);
    }
  }

  private saveFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Ошибка записи', 'Обнаружена одна или более ошибок, при записи данных:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);


  }

  public cancel() {
    /*if (this.parentDialog) {
      this.parentDialog.dialogRef.close(null);
    }*/
    if (this.parent instanceof DeviceVolumeDialogComponent) {
      this.parent.dialogRef.close(null);
    }
    if (this.parent  instanceof  DeviceVolumeSheetComponent) {
      this.parent.bottomSheetRef.dismiss();
    }
  }

}
