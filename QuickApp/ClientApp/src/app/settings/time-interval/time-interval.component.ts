import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, MessageSeverity} from '../../services/alert.service';
import {TimeIntervalService} from '../../services/time-interval-service/time-interval.service';
import {FormBuilder, NgModel, Validators} from '@angular/forms';
import {TimeIntervalModel} from '../../models/time-interval.model';
import {Utilities} from '../../services/utilities';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-time-interval',
  templateUrl: './time-interval.component.html',
  styleUrls: ['./time-interval.component.scss']
})
export class TimeIntervalComponent  {
  @ViewChild('formInterval', {static: true})
  formInterval: NgModel;
  @ViewChild('formOvertime', {static: true})
  formOvertime: NgModel;
  timeInterval: TimeIntervalModel = new TimeIntervalModel();


  /*get interval() {
    this.formInterval.va;
  }*/

  constructor(private alertService: AlertService,
              private timeIntervalService: TimeIntervalService,
              private snackBar: MatSnackBar) {
    this.timeIntervalService.getTimeInterval().subscribe(
      result =>  this.gotSuccess(result),
      error => this.gotFailed(error)
    );

  }

  private gotSuccess(entity: TimeIntervalModel) {
    this.timeInterval.id = entity.id;
    this.timeInterval.interval = entity.interval;
    this.timeInterval.overTime = entity.overTime;
    // this.alertService.showMessage('Успешно!', 'Данные сохранены', MessageSeverity.success);
  }

  private gotFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Ошибка записи', 'Обнаружена одна или более ошибок, при записи данных:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);
  }



  save() {
    if (this.formInterval.valid && this.formOvertime.valid) {
      this.snackBar.open('Save time intervals?', 'SAVE', {duration: 5000})
        .onAction().subscribe(() => {
        this.alertService.startLoadingMessage('', 'Saving new defaults');


        this.timeIntervalService.updateTimeInterval(this.timeInterval)
          .subscribe(response => {
              this.alertService.stopLoadingMessage();
              this.alertService.showMessage('Update', 'Time intervals updated successfully', MessageSeverity.success);

            },
            error => {
              this.alertService.stopLoadingMessage();
              this.alertService.showStickyMessage('Save Error', `An error occured whilst saving time intervals.\r\nErrors: "${Utilities.getHttpResponseMessages(error)}"`,
                MessageSeverity.error, error);
            });
      });
    } else {
      this.alertService.stopLoadingMessage();
      this.alertService.showStickyMessage('Ошибка валидации', 'Обнаружена одна или более ошибок, при попытке записи данных:', MessageSeverity.error );
      // this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

  }

  cancel() {}

}
