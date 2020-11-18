import {Component, Inject, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {DeviceModel} from '../../../models/device.model';
import {DeviceService} from '../../../services/device-service/device.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertService, MessageSeverity} from '../../../services/alert.service';


@Component({
  selector: 'app-device-edit-dialog',
  templateUrl: './device-edit-dialog.component.html',
  styleUrls: ['./device-edit-dialog.component.scss']
})
export class DeviceEditDialogComponent implements OnInit, OnChanges, OnDestroy {
   @ViewChild('form', { static: true })
  private form: NgForm;
  deviceForm: FormGroup;
  device: DeviceModel;
  subDevice: Subscription;
  isNewDevice: boolean;
  subNewDevice: Subscription;
  subUpdateDevice: Subscription;

  get name() {
    return this.deviceForm.get('name');
  }

  get cityAddress() {
    return this.deviceForm.get('cityAddress');
  }

  get ipAddress() {
    return this.deviceForm.get('ipAddress');
  }

  constructor(private deviceService: DeviceService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DeviceModel>,
              @Inject(MAT_DIALOG_DATA) public data: {device: DeviceModel}) {
            this.device = this.data.device;
            console.log('constructor this.device = ' + JSON.stringify(this.device));
            this.buildForm();
  }

  ngOnInit() {
    if (this.device) {
      this.isNewDevice = false;
    } else {
      this.isNewDevice = true;
      this.device = new DeviceModel();
      this.device.isActive = true;
    }
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subNewDevice) {
      this.subNewDevice.unsubscribe();
    }
    if (this.subUpdateDevice) {
      this.subUpdateDevice.unsubscribe();
    }
  }

  private buildForm() {
    this.deviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      cityAddress: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)]],
      isActive: ''
    });
  }

  public resetForm() {
    this.deviceForm.reset({
      name: this.device.name || '',
      cityAddress: this.device.cityAddress || '',
      ipAddress: this.device.ipAddress || '',
      isActive: this.device.isActive
    });
  }

  save() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null);
      return;
    }

    if (!this.deviceForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.alertService.startLoadingMessage('Запись измений...');

    console.log('Before editedDevice');
    const editedDevice = this.getEditedDevice();
    console.log('After editedDevice');

    if (this.isNewDevice) {
      this.subNewDevice = this.deviceService.newDevice(editedDevice).subscribe(
        result => this.saveCompleted(result),
        error => this.saveFailed(error)
      );
    } else {
      this.subUpdateDevice =  this.deviceService.updateDevice(editedDevice).subscribe(
        () => this.saveCompleted(editedDevice),
        error => this.saveFailed(error)
      );
    }
  }

  private getEditedDevice(): DeviceModel {
    const formModel = this.deviceForm.value;

    return {
      id: this.device.id,
      cityAddress: formModel.cityAddress,
      isActive: formModel.isActive,
      isOnline: this.device.isOnline,
      isMonitor: this.device.isMonitor,
      ipAddress: formModel.ipAddress,
      lastUpdate: this.device.lastUpdate,
      movie: this.device.movie,
      name: formModel.name,
      screenshot: this.device.screenshot,
      temperature: this.device.temperature,
      volume: this.device.volume
    };

  }

  private saveCompleted(device?: DeviceModel) {
    console.log('--- saveCompleted  ----');
    if (device) {
      this.device = device;
      if (this.isNewDevice) {
        // this.device.id = 0;
        // this.device.temperature = 0.0;
      }
    }
    console.log('saveCompleted device = ' + JSON.stringify(device));
    this.alertService.stopLoadingMessage();
    this.resetForm();
    this.alertService.showMessage('Успешно!', 'Данные сохранены', MessageSeverity.success);
    // this.resetForm();
    this.dialogRef.close(device);
  }

  private saveFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Ошибка записи', 'Обнаружена одна или более ошибок, при записи данных:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);


  }


  cancel() {
    this.alertService.stopLoadingMessage();
    this.dialogRef.close(null);
  }


}
