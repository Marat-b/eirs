import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fadeInOut} from '../../../services/animations';
import {MatBottomSheet, MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../../models/user.model';
import {DeviceModel} from '../../../models/device.model';
import {DeviceEditModel} from '../../../models/device-edit.model';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {DeviceService} from '../../../services/device-service/device.service';
import {Permission} from '../../../models/permission.model';
import {AccountService} from '../../../services/account.service';
import {interval, Subscription} from 'rxjs';
import {DeviceEditDialogComponent} from '../device-edit-dialog/device-edit-dialog.component';
import {DELETE} from '@angular/cdk/keycodes';
import {Utilities} from '../../../services/utilities';
import {MediaMatcher} from '@angular/cdk/layout';
import {DeviceRefreshService} from '../../../services/device-service/device-refresh.service';
import {TimeIntervalService} from '../../../services/time-interval-service/time-interval.service';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {DeviceScreenshotShowComponent} from '../device-screenshot-show/device-screenshot-show.component';
import {DeviceScreenshotDialogComponent} from '../device-screenshot-dialog/device-screenshot-dialog.component';
import {DeviceScreenshotSheetComponent} from '../device-screenshot-sheet/device-screenshot-sheet.component';
import {DeviceViewSheetComponent} from '../device-view-sheet/device-view-sheet.component';
import {DeviceViewDialogComponent} from '../device-view-dialog/device-view-dialog.component';
import {DeviceVolumeDialogComponent} from '../device-volume-dialog/device-volume-dialog.component';
import {DeviceVolumeSheetComponent} from '../device-volume-sheet/device-volume-sheet.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  animations: [fadeInOut]
})
export class DeviceListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadingIndicator: boolean;
  displayedColumns = ['cityAddress', 'screenshot', 'isOnline', 'volume', 'lastUpdate'];
  dataSource: MatTableDataSource<DeviceModel>;
  sub: Subscription;
  uts: Subscription;
  uds: Subscription;
  usb: Subscription;
  subEditDevice: Subscription;
  subConfirmDelete: Subscription;
  subSetVolumeDialog: Subscription;
  subSetVolumeSheet: Subscription;
  sourceDevice: DeviceModel;
  viewDevice: DeviceModel;
  deviceId: number;
  mobileQuery: MediaQueryList;
  showViewDevice = false;
  // timeInterval = 1800000;
  overTime: number;
  setIntervalId: any;
  private mobileQueryListener: () => void;

  constructor(private alertService: AlertService,
              private accountService: AccountService,
              private deviceService: DeviceService,
              private deviceRefreshService: DeviceRefreshService,
              private timeintervalService: TimeIntervalService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              // private utilities: Utilities,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:800px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    if (this.canManageUsers) {
      this.displayedColumns.push('actions');
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();

    /*this.timeintervalService.getTimeInterval().pipe(
      map(m => m.interval ),

    )*/

    this.uts = this.timeintervalService.getTimeInterval().pipe(
      tap(t => {
        this.overTime = t.overTime;
        console.log('getTimeInterval this.overTime = ' + this.overTime);
      }),
      switchMap(s =>
        // this.overTime = s.overTime;
        interval(s.interval * 60000).pipe(
          concatMap(c => this.deviceService.getDevices()
          )
        )
      )).subscribe(result => {
        this.onDataLoadSuccessful(result);
        this.deviceRefreshService.refreshDevices(result);
        if (this.viewDevice !== undefined) {
          this.deviceRefreshService.refreshDevice(this.viewDevice.id);
        }
      },
      err => this.onDataLoadFailed(err));


    /*setInterval(() => {
      console.log(' I\'m refreshed');
      this.deviceService.getDevices().subscribe(
        result => {
          this.deviceRefreshService.refreshDevices(result);
          if (this.viewDevice !== undefined) {
            this.deviceRefreshService.refreshDevice(this.viewDevice.id);
          }
        }
      );

    }, 20000);*/
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }

  ngOnInit() {
    // console.log('ngOnInit this.timeInterval = ' + this.timeInterval);
    console.log('ngOnInit this.overTime = ' + this.overTime);
    /*this.setIntervalId = setInterval(() => {
      console.log(' I\'m refreshed');
      this.uds = this.deviceService.getDevices().subscribe(
        result => {
          this.onDataLoadSuccessful(result);
          this.deviceRefreshService.refreshDevices(result);
          if (this.viewDevice !== undefined) {
            this.deviceRefreshService.refreshDevice(this.viewDevice.id);
          }

        },
        err => this.onDataLoadFailed(err)
      );
    }, this.timeInterval);*/

    this.loadData();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.uds) {
      this.uds.unsubscribe();
    }
    if (this.uts) {
      this.uts.unsubscribe();
    }
    if (this.usb) {
      this.usb.unsubscribe();
    }
    if (this.subEditDevice) {
      this.subEditDevice.unsubscribe();
    }
    if (this.subConfirmDelete) {
      this.subConfirmDelete.unsubscribe();
    }
    if (this.subSetVolumeDialog) {
      this.subSetVolumeDialog.unsubscribe();
    }
    if (this.subSetVolumeSheet) {
      this.subSetVolumeSheet.unsubscribe();
    }
    clearInterval(this.setIntervalId);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  public editDevice(device?: DeviceModel) {
    this.sourceDevice = device;

    const dialogRef = this.dialog.open(DeviceEditDialogComponent,
      {
        panelClass: 'mat-dialog-md',
        data: {device}
      });

    this.subEditDevice = dialogRef.afterClosed().subscribe(device => {
      if (device) {
        this.updateDevice(device);
      }
    });
  }

  public confirmDelete(device: DeviceModel) {
    this.usb = this.snackBar.open(`Удалить ${device.name} ? `, 'DELETE', {duration: 5000}).onAction().subscribe(
      () => {
        this.subConfirmDelete = this.deviceService.deleteDevice(device.id).subscribe(
          results => {
            this.dataSource.data = this.dataSource.data.filter(item => item !== device);
          },
          error => {
            this.alertService.showStickyMessage('Ошибка удаления', `Ошибка при удаления устройства.\r\nОшибка: "${Utilities.getHttpResponseMessage(error)}"`,
              MessageSeverity.error, error);
          }
        );
      }
    );
  }

  setViewDevice(device: DeviceModel) {
    console.log('setViewDevice device = ' + JSON.stringify(device));
    const overTime = this.overTime;
    if (!this.mobileQuery.matches) {
      this.dialog.open(DeviceViewDialogComponent,
        {
          panelClass: 'mat-dialog-md',
          maxWidth: '80%',
          maxHeight: '70%',
          data: {device, overTime}
        });
    } else {
      this.bottomSheet.open(DeviceViewSheetComponent, {
        data: {device, overTime}
      });
    }
  }

  public isOvertime(overTime: number, device: DeviceModel): boolean {
    return Utilities.isOvertime(overTime, device.lastUpdate, device.isActive);
  }

  public getDifferentTime(deviceDate: string): number {
    return Utilities.getDifferentTime(deviceDate);
  }

  public printDuration(lastUpdate: string): string {
    const currentDate: Date = new Date(Date.now());
    const beginDate: Date = new Date(lastUpdate);
    // console.log('printDuration=' + Utilities.printDuration(beginDate, currentDate));
    return Utilities.printDuration(beginDate, currentDate);
  }

  public getColor(overTime: number, device: DeviceModel): string {
    if (device.isActive) {
      if (device.isMonitor && !this.isOvertime(overTime, device)) {
        return 'primary';
      } else {
        if (this.isOvertime(overTime, device)) {
          return 'accent';
        } else {
          if (!device.isMonitor) {
            return 'orange';
          }
        }
      }
    } else {
      return 'gray';
    }
  }

  public getTooltip(deviceDate: string): string {
    return 'Превышен интерал обновления данных на ' + this.printDuration(deviceDate)/* + ' минут'*/;
  }

  public showScreenshot(device: DeviceModel) {
    console.log('@@@@@@@@@@ Screenshot is showed id=' + device.id);

    if (!this.mobileQuery.matches) {
      this.dialog.open(DeviceScreenshotDialogComponent,
        {
          panelClass: 'mat-dialog-md',
          maxWidth: '70%',
          maxHeight: '70%',
          data: {device}
        });
    } else {
      this.bottomSheet.open(DeviceScreenshotSheetComponent, {
        data: {device}
      });
    }

  }

  public setVolume(device: DeviceModel) {
    this.sourceDevice = device;
    if (!this.mobileQuery.matches) {
      const dialogRef = this.dialog.open(DeviceVolumeDialogComponent,
        {
          panelClass: 'mat-dialog-md',
          maxWidth: '70%',
          maxHeight: '70%',
          data: {device}
        });
      this.subSetVolumeDialog = dialogRef.afterClosed().subscribe(device => {
        if (device) {
          this.updateDevice(device);
          console.log('setVolume volume=' + device.volume);
        }
      });
    } else {
      const sheetRef = this.bottomSheet.open(DeviceVolumeSheetComponent, {
        data: {device}
      });
      this.subSetVolumeSheet = sheetRef.afterDismissed().subscribe(device => {
        if (device) {
          this.updateDevice(device);
          console.log('setVolume volume=' + device.volume);
        }
      });
    }

  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    console.log('refresh this.overTime = ' + this.overTime);
    this.applyFilter(this.dataSource.filter);
  }

  private loadData() {
    console.log('loadData this.overTime = ' + this.overTime);
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    /*this.sub = this.deviceRefreshService.devicesRefresh$.subscribe(
      results => this.onDataLoadSuccessful(results),
      error => this.onDataLoadFailed(error)
    );*/
    this.sub = this.deviceService.getDevices().subscribe(
      results => this.onDataLoadSuccessful(results),
      error => this.onDataLoadFailed(error)
    );
  }

  private onDataLoadSuccessful(devices: DeviceModel[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.dataSource.data = devices;
    // console.log('++++ image=' + devices[0].screenshot);
  }

  private onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    console.log('Loading is failed....');
    console.log(error);
  }

  private updateDevice(device: DeviceModel) {

    if (this.sourceDevice) {
      console.log('updateDevice this.sourceDevice = ' + JSON.stringify(this.sourceDevice));
      Object.assign(this.sourceDevice, device);
      /*this.dataSource.data = this.dataSource.data.filter(f => f.id === 10).map(m => m.ipAddress = '222.2.2.2.2.');*/
      this.alertService.showMessage('Success', `Изменения устройства \"${this.sourceDevice.name}\" были успешно записаны`, MessageSeverity.success);
      this.sourceDevice = null;
    } else {
      this.dataSource.data.push(device);
      this.refresh();
      this.alertService.showMessage('Success', `Устройство \"${device.name}\" было успешно создано`, MessageSeverity.success);
    }
    // this.refresh();
  }
}
