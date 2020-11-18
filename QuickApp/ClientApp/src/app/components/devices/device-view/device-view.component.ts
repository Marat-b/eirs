import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DeviceModel} from '../../../models/device.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DeviceRefreshService} from '../../../services/device-service/device-refresh.service';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {Utilities} from '../../../services/utilities';
import {MatRipple} from '@angular/material';
import {animation} from '@angular/animations';
import Timer = NodeJS.Timer;


@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss']
})
export class DeviceViewComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @ViewChild('form', { static: true })
  private form: NgForm;
  @ViewChild(MatRipple, { static: true }) ripple: MatRipple;
  device: DeviceModel;
  test: DeviceModel;
  deviceForm: FormGroup;
  sub: Subscription;
  isOverTime = false;
  setIntervalId: Timer;

  @Input() viewDevice: DeviceModel = new DeviceModel();
  @Input() overTime: number;

  constructor(/*private route: ActivatedRoute,
              private formBuilder: FormBuilder,*/
              private deviceRefreshService: DeviceRefreshService) {
    /*this.device = this.route.parent.snapshot.data['deviceModel'];
    console.log('constructor this.device = ' + JSON.stringify(this.device));*/
    // this.device = this.route.snapshot.data['deviceModel'];
   /* this.sub = this.route.data.subscribe(data => {
       const  device = data['deviceModel'];
       console.log('ngOnInit() data = ' + JSON.stringify(data) );
       this.deviceRefreshService.deviceRefresh$.subscribe(
         result => {this.device = result.filter(f => f.id === device.id)[0]; }
       );
    });*/
   /*if (this.sub != null) {
      this.sub.unsubscribe();
   }*/
   // this.device = this.route.snapshot.data['deviceModel'];
    if (this.viewDevice !== undefined) {
      this.device = this.viewDevice;
    } else {
      this.device = new DeviceModel();
    }
    // this.device = this.viewDevice;
    // const device = this.device;
    console.log('ngOnInit() data = ' + JSON.stringify(this.device) );
    this.sub =  this.deviceRefreshService.deviceRefresh$.subscribe(
      result => {
        console.log('result = ' + JSON.stringify(result));
        // this.resetForm(result.filter(f => f.id === device.id)[0]);
        this.dataLoad(result);
        console.log('constructor this.device = ' + JSON.stringify(this.device));
        // this.compareTime(1, this.device.lastUpdate);
      }
    );
    // setTimeout(() => {}, 5000);

  }

  ngOnInit() {

    /*this.route.data.subscribe(data => {
      // this.device = data['deviceModel'];
      console.log('ngOnInit() data = ' + JSON.stringify(data) );
    });*/

  }

  ngAfterViewInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    console.log('OnChanges this.viewDevice = ' + JSON.stringify(this.viewDevice));
    if (this.viewDevice !== undefined) {
      this.device = this.viewDevice;
    }
    console.log('device-view ngAfterViewInit this.device.isMonitor=' + this.device.isMonitor);
    console.log('######## this.setIntervalId=' + this.setIntervalId);
    if (!this.device.isMonitor &&  this.setIntervalId === undefined  ) {
      this.setIntervalId = setInterval(() => this.launchRipple(), 2000);

    } else {
      // setInterval(() => null , 0);
      if (this.device.isMonitor) {
        clearInterval(this.setIntervalId);
        this.setIntervalId = undefined; // setInterval(() => this.launchRipple(), 0);
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this.setIntervalId);
  }

  private dataLoad(device: DeviceModel) {
    console.log('dataLoad device = ' + JSON.stringify(device));
    this.device = device;
  }

  public isOvertime(overTime: number, device: DeviceModel): boolean {
    return Utilities.isOvertime(overTime, device.lastUpdate, device.isActive);
  }

  public getDifferentTime(deviceDate: string): number {
    return Utilities.getDifferentTime(deviceDate);
  }

  public getTooltip(deviceDate: string): string {
    return 'Превышен интерал обновления данных на ' + this.printDuration(deviceDate) /*+ ' минут'*/;
  }

  public printDuration(lastUpdate: string): string {
    const currentDate: Date = new Date(Date.now());
    const beginDate: Date = new Date(lastUpdate);
    console.log('printDuration=' + Utilities.printDuration(beginDate, currentDate));
    return Utilities.printDuration(beginDate, currentDate);
  }

  /** Shows a centered and persistent ripple. */
  public launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true,
      animation: {enterDuration: 1000, exitDuration: 1000},
      color: 'accent'
    });

    // Fade out the ripple later.
    rippleRef.fadeOut();
  }

}
