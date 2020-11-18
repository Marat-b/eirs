// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AlertService, DialogType, AlertMessage, MessageSeverity } from '../../services/alert.service';
import { Subscription } from 'rxjs';
import {DeviceService} from '../../services/device-service/device.service';
import {DeviceModel} from '../../models/device.model';

require('chart.js');

@Component({
  selector: 'statistics-demo',
  templateUrl: './statistics-demo.component.html',
  styleUrls: ['./statistics-demo.component.scss']
})
export class StatisticsDemoComponent implements OnInit, OnDestroy {
  sub: Subscription;

  chartData = [
    { data: [65, 59/*, 80, 81, 56, 55*/], label: 'Series A' }
    /*{ data: [28, 48/!*, 40, 19, 86, 27*!/], label: 'Series B' }*/
    // { data: [18, 48, 77, 9, 100, 27], label: 'Series C' }
  ];
  chartLabels = ['Активные устройства', 'Не активные устройства' /*'Feb', 'Mar', 'Apr', 'May', 'Jun'*/];
  chartOptions = {
    responsive: true,
    title: {
      display: false,
      fontSize: 16,
      text: 'Important Stuff'
    }
  };
  // chart for on-line devices
  chartData2 = [{data: [], label: ''}];
  chartLabels2 = ['Воспроизведение потокового видео', 'Воспроизведение локального видео файла'];
  chartColors = [
    { // grey
      // fillColor: 'rgb(255,26,103)',
      // backgroundColor: ['rgba(41,42,177,0.32)', 'rgb(101,92,177)']
      /*borderColor: 'rgb(101,92,177)',
      pointBackgroundColor: 'rgb(177,82,79)',
      pointBorderColor: '#ffa2f6',
      pointHoverBackgroundColor: '#ff1a67',
      pointHoverBorderColor: 'rgba(155,40,177,0.8)'*/
    }/*,
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgb(29,21,96)',
      pointBackgroundColor: 'rgb(96,26,36)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }*//*,
    { // something else
      backgroundColor: 'rgba(128,128,128,0.2)',
      borderColor: 'rgb(34,29,128)',
      pointBackgroundColor: 'rgba(128,128,128,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(128,128,128,0.8)'
    }*/
  ];
  chartColors2 = [];
  chartLegend = true;
  chartType = 'pie';

  timerReference: any;
  mediaQuerySub: Subscription;
  allDevices: number;
  activeDevices: number;
  onlineDevices: number;


  constructor(private alertService: AlertService, private mediaQuery: MediaObserver, private deviceService: DeviceService) {
    this.sub = this.deviceService.getDevices().subscribe(
      result => { this.analize(result); this.doCart(); }
    );
  }

  ngOnInit() {
    // this.timerReference = setInterval(() => this.randomize(), 5000);

    // this.mediaQuerySub = this.mediaQuery.media$.subscribe(change => this.chartLegend = change.mqAlias == 'xs' ? false : true);
  }

  ngOnDestroy() {
    // clearInterval(this.timerReference);
    // this.mediaQuerySub.unsubscribe();
    this.sub.unsubscribe();
  }

  analize(devices: DeviceModel[]) {
    this.allDevices = devices.length;
    console.log('this.allDevices=' + this.allDevices);
    this.activeDevices = devices.filter(f => f.isActive).length;
    console.log('this.activeDevices=' + this.activeDevices);
    this.onlineDevices = devices.filter(f => f.isActive).filter(i => i.isOnline).length;
    console.log('this.onlineDevices=' + this.onlineDevices);
  }

  doCart() {
    this.chartData.length = 0;
    this.chartData.push({data: [this.activeDevices, this.allDevices - this.activeDevices], label: 'Активных'});
    this.chartColors = [ { // grey
      fillColor: ['rgb(255,26,103)'],
      backgroundColor: ['rgba(41,42,177,0.32)', 'rgba(177,82,79,0.5)'],
      borderColor: ['rgb(101,92,177)', 'rgb(177,89,172)'],
      pointBackgroundColor: ['rgb(35,68,177)', 'rgb(177,82,79)'],
      pointBorderColor: '#ffa2f6',
      pointHoverBackgroundColor: '#ff1a67',
      pointHoverBorderColor: 'rgba(155,40,177,0.8)'
    }];
    this.chartData2.length = 0;
    this.chartData2.push({data: [this.onlineDevices, this.activeDevices -  this.onlineDevices], label: 'Воспроизведение'});
    this.chartColors2 = [ { // grey
      fillColor: ['rgb(255,26,103)'],
      backgroundColor: ['rgba(41,42,177,0.32)', 'rgba(177,82,79,0.5)'],
      borderColor: ['rgb(101,92,177)', 'rgb(177,89,172)'],
      pointBackgroundColor: ['rgb(35,68,177)', 'rgb(177,82,79)'],
      pointBorderColor: '#ffa2f6',
      pointHoverBackgroundColor: '#ff1a67',
      pointHoverBorderColor: 'rgba(155,40,177,0.8)'
    }];

  }

  /*public chartColors2() {return  [
    { // grey
      // fillColor: 'rgb(255,26,103)',
      backgroundColor: ['rgba(34,29,128,0.2)', 'rgba(34,29,128,0.2)'],
      borderColor: ['rgb(41,42,177)', 'rgb(41,42,177)']
      /!*pointBackgroundColor: ['rgb(177,82,79)'],
      pointBorderColor: ['#ffa2f6'],
      pointHoverBackgroundColor: ['#ff1a67'],
      pointHoverBorderColor: ['rgba(155,40,177,0.8)']*!/
    }]; }*/

  /*randomize(): void {
    const _chartData = new Array(this.chartData.length);
    for (let i = 0; i < this.chartData.length; i++) {
      _chartData[i] = { data: new Array(this.chartData[i].data.length), label: this.chartData[i].label };

      for (let j = 0; j < this.chartData[i].data.length; j++) {
        _chartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }

    this.chartData = _chartData;
  }*/

 /* changeChartType(type: string) {
    this.chartType = type;
  }*/

  showMessage(msg: string): void {
    this.alertService.showMessage('Demo', msg, MessageSeverity.info);
  }

  /*showDialog(msg: string): void {
    this.alertService.showDialog('Configure Chart', msg, DialogType.prompt, (val) => this.configure(true, val), () => this.configure(false), 'Ok', 'Cancel', 'Default');
  }*/

  /*configure(response: boolean, value?: string) {

    if (response) {

      this.alertService.showStickyMessage('Simulating...', '', MessageSeverity.wait);

      setTimeout(() => {

        this.alertService.resetStickyMessage();
        this.alertService.showMessage('Demo', `Your settings was successfully configured to \"${value}\"`, MessageSeverity.success);
      }, 2000);
    } else {
      this.alertService.showMessage('Demo', 'Operation cancelled by user', MessageSeverity.default);
    }
  }*/

  chartClicked(e): void {
    console.log(e);
  }

  chartHovered(e): void {
    console.log(e);
  }
}
