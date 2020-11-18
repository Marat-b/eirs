import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {LinkPoolService} from '../../../services/link-pool-service/link-pool.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {DeviceModel} from '../../../models/device.model';
import {UrlPoolModel} from '../../../models/link-pool.model';
import {Utilities} from '../../../services/utilities';

@Component({
  selector: 'app-linkpool-view',
  templateUrl: './linkpool-view.component.html',
  styleUrls: ['./linkpool-view.component.scss']
})
export class LinkpoolViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  displayedColumns = ['linkPath', 'actions'];

  constructor() {


  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {

  }

  private loadData() {

  }

}
