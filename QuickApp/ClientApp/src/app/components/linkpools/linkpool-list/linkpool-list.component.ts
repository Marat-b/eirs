import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatBottomSheet, MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UrlPoolModel} from '../../../models/link-pool.model';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {LinkPoolService} from '../../../services/link-pool-service/link-pool.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {Utilities} from '../../../services/utilities';
import {Subscription} from 'rxjs';
import {fadeInOut} from '../../../services/animations';
import {LinkpoolEditDialogComponent} from '../linkpool-edit-dialog/linkpool-edit-dialog.component';
import {LinkpoolDeviceEditDialogComponent} from '../linkpool-device-edit-dialog/linkpool-device-edit-dialog.component';

@Component({
  selector: 'app-linkpool-list',
  templateUrl: './linkpool-list.component.html',
  styleUrls: ['./linkpool-list.component.scss'],
  animations: [fadeInOut]
})
export class LinkpoolListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  loadingIndicator: boolean;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  dataSource: MatTableDataSource<UrlPoolModel>;
  sourceLinkPool: UrlPoolModel;
  displayedColumns = ['poolName', 'linkPath', 'actions'];
  subConfirmDelete: Subscription;
  usb: Subscription;
  subEditLinkPool: Subscription;

  constructor(private alertService: AlertService,
              private linkPoolService: LinkPoolService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:800px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.dataSource = new MatTableDataSource();

  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    if (this.usb) {
      this.usb.unsubscribe();
    }
    if (this.subConfirmDelete) {
      this.subConfirmDelete.unsubscribe();
    }
    if (this.subEditLinkPool) {
      this.subEditLinkPool.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;
    this.linkPoolService.getLinkPools().subscribe(
      results => this.onDataLoadSuccessful(results),
      error => this.onDataLoadFailed(error));
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  public  editLinkpool(linkPool?: UrlPoolModel) {
    console.log('editLinkpool linkPool=' + JSON.stringify(linkPool));
    this.sourceLinkPool = linkPool;
    const dialogRef = this.dialog.open(LinkpoolEditDialogComponent,
      {
        panelClass: 'mat-dialog-md',
        data: {linkPool}
      });

    this.subEditLinkPool = dialogRef.afterClosed().subscribe(res => {
      console.log('subEditLinkPool res=' + res);
      if (res) {
        this.updateLinkPool(res);
      }
    });

  }

  private updateLinkPool(linkPool: UrlPoolModel) {

    if (this.sourceLinkPool) {
      console.log('updateLinkPool this.sourceLinkPool = ' + JSON.stringify(this.sourceLinkPool));
      Object.assign(this.sourceLinkPool, linkPool);
      /*this.dataSource.data = this.dataSource.data.filter(f => f.id === 10).map(m => m.ipAddress = '222.2.2.2.2.');*/
      this.alertService.showMessage('Success', `Изменения устройства \"${this.sourceLinkPool.linkPath}\" были успешно записаны`, MessageSeverity.success);
      this.sourceLinkPool = null;
    } else {
      this.dataSource.data.push(linkPool);
      this.refresh();
      this.alertService.showMessage('Success', `Устройство \"${linkPool.linkPath}\" было успешно создано`, MessageSeverity.success);
    }
    // this.refresh();
  }

  public  editDevice(linkPool: UrlPoolModel) {
    const dialogRef = this.dialog.open(LinkpoolDeviceEditDialogComponent,
      {
        panelClass: 'mat-dialog-md',
        // height: '70%',
        data: {linkPool}
      });

  }


  public confirmDelete(linkpool: UrlPoolModel) {
    this.usb = this.snackBar.open(`Удалить ${linkpool.linkPath} ? `, 'DELETE', {duration: 5000}).onAction().subscribe(
      () => {
        this.subConfirmDelete = this.linkPoolService.deleteLinkPool(linkpool.linkpoolId).subscribe(
          results => {
            this.dataSource.data = this.dataSource.data.filter(item => item !== linkpool);
          },
          error => {
            this.alertService.showStickyMessage('Ошибка удаления', `Ошибка при удаления устройства.\r\nОшибка: "${Utilities.getHttpResponseMessage(error)}"`,
              MessageSeverity.error, error);
          }
        );
      }
    );
  }


  private onDataLoadSuccessful(devices: UrlPoolModel[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.dataSource.data = devices;
    // console.log('++++ image=' + devices[0].screenshot);
  }

  private onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;
    this.alertService.showStickyMessage('Load error', `Unable to retrieve link pools from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);

    console.log('Loading is failed....');
    console.log(error);
  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
  }

}
