import {Component, Inject, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DeviceService} from '../../../services/device-service/device.service';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UrlPoolModel} from '../../../models/link-pool.model';
import {DeviceUrlPoolModel} from '../../../models/device-link-pool.model';
import {Utilities} from '../../../services/utilities';
import {DeviceLPModel} from '../../../models/device-lp.model';
import {SelectionModel} from '@angular/cdk/collections';
import {concat, merge, Subscription} from 'rxjs';
import {reduce} from 'rxjs/operators';
import {DeviceLinkPoolService} from '../../../services/device-link-pool-service/device-link-pool.service';
import {DeviceSelectedModel} from '../../../models/device-selected.model';

@Component({
  selector: 'app-linkpool-device-edit-dialog',
  templateUrl: './linkpool-device-edit-dialog.component.html',
  styleUrls: ['./linkpool-device-edit-dialog.component.scss']
})
export class LinkpoolDeviceEditDialogComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('form', { static: true })
  private form: NgForm;
  linkPoolForm: FormGroup;
  deviceLinkPool: DeviceUrlPoolModel;
  linkPool: UrlPoolModel;
  selectedDeviceLinkPool: number[];
  devices: DeviceLPModel[];
  loadingIndicator: boolean;
  selectedDevices: SelectionModel<DeviceLPModel>;
  subUpdateLinkPool: Subscription;
  subGetLinkPool: Subscription;

  constructor(private deviceService: DeviceService,
              private deviceLinkPoolService: DeviceLinkPoolService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UrlPoolModel>,
              @Inject(MAT_DIALOG_DATA) public data: {linkPool: UrlPoolModel}) {
    this.linkPool = this.data.linkPool;
    console.log('constructor this.linkPool = ' + JSON.stringify(this.linkPool));
    this.buildForm();
    this.selectedDevices = new SelectionModel<DeviceLPModel>(true, []);
    /*deviceService.getDeviceLinkPool(this.linkPool.linkpoolId).subscribe(result => {
      this.deviceLinkPool = result;
      console.log('deviceLinkPool=' + JSON.stringify(this.deviceLinkPool));
    },
      error => {
      this.alertService.showStickyMessage('Error', `Ошибка при чтении устройства.\r\nОшибка: "${Utilities.getHttpResponseMessage(error)}"`,
        MessageSeverity.error, error);
      });*/
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(): void {
    // tslint:disable-next-line:max-line-length
    // const selDevices = this.devices ? this.devices.filter(x=>x.id === this.selectedDeviceLinkPool)  /*this.devices.find(y=>y.id ===this.selectedDeviceLinkPool))*/
    const selDevices = this.selectedDeviceLinkPool.map(m => (this.devices.filter(f => f.id === m)));
    console.log('ngOnChanges() selDevices=' + selDevices);
  }

  ngOnDestroy(): void {
    if (this.subUpdateLinkPool) {
      this.subUpdateLinkPool.unsubscribe();
    }
    if (this.subGetLinkPool) {
      this.subGetLinkPool.unsubscribe();
    }
  }

  private buildForm() {
    this.linkPoolForm = this.formBuilder.group({

    });
  }

  private loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.subGetLinkPool = this.deviceService.getDeviceLinkPool(this.linkPool.linkpoolId).subscribe(
      results => this.onDataLoadSuccessful(results),
      error => this.onDataLoadFailed(error));
  }

  save() {
    if (!this.form.submitted) {
      // Causes validation to update.
      this.form.onSubmit(null);
      return;
    }

    if (!this.linkPoolForm.valid) {
      this.alertService.showValidationError();
      return;
    }

    this.alertService.startLoadingMessage('Запись измений...');

    console.log('Before editedLinkPool');
    const editedLinkPool = this.getEditedLinkPool();
    console.log('After editedLinkPool editedLinkPool=' + JSON.stringify(editedLinkPool));


    this.subUpdateLinkPool =  this.deviceLinkPoolService.updateDeviceLinkPool(this.linkPool.linkpoolId, editedLinkPool).subscribe(
        () => this.saveCompleted(editedLinkPool),
        error => this.saveFailed(error));

  }

  private getEditedLinkPool(): DeviceSelectedModel {
    return {
      devicesId: this.selectedDevices.selected.map(m => m.id)
    };

  }

  /*save() {
    if (!this.form.submitted) {
      this.form.onSubmit(null);
      return;
    }

    //const formModel = this.linkPoolForm.value;
    const formModel = this.selectedDevices.selected;
    console.log('save formModel=' + formModel);
    console.log('save formModel=' + JSON.stringify(formModel));
  }*/

  public cancel() {
    this.dialogRef.close(null);
  }

  private onDataLoadSuccessful(result: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.devices = result[0];
    this.selectedDeviceLinkPool = result[1];
    // console.log('++++ image=' + devices[0].screenshot);
    const selDevices = this.selectedDeviceLinkPool.map(m => (this.devices.filter(f => f.id === m)).reduce(r => r));
    console.log('onDataLoadSuccessful() selDevices=' + JSON.stringify(selDevices));
    this.selectedDevices = new SelectionModel<DeviceLPModel>(true, selDevices);
    console.log('onDataLoadSuccessful() selectedDevices=' + JSON.stringify(this.selectedDevices));
  }

  private onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    // tslint:disable-next-line:max-line-length
    this.alertService.showStickyMessage('Load error', `Unable to retrieve link pools from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
    console.log('Loading is failed....');
    console.log(error);
  }

  private saveCompleted(deviceLinkPool: DeviceSelectedModel) {
    console.log('--- saveCompleted  ----');
    /*if (deviceLinkPool) {
      this.deviceLinkPool = deviceLinkPool;

    }*/
    console.log('saveCompleted linkPool = ' + JSON.stringify(deviceLinkPool));
    this.alertService.stopLoadingMessage();
    // this.resetForm();
    this.alertService.showMessage('Успешно!', 'Данные сохранены', MessageSeverity.success);
    // this.resetForm();
    this.dialogRef.close(null);
  }

  private saveFailed(error: any) {
    this.alertService.stopLoadingMessage();
    // tslint:disable-next-line:max-line-length
    this.alertService.showStickyMessage('Ошибка записи', 'Обнаружена одна или более ошибок, при записи данных:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }

}
