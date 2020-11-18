import {Component, Inject, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AlertService, MessageSeverity} from '../../../services/alert.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LinkPoolService} from '../../../services/link-pool-service/link-pool.service';
import {UrlPoolModel} from '../../../models/link-pool.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-linkpool-edit-dialog',
  templateUrl: './linkpool-edit-dialog.component.html',
  styleUrls: ['./linkpool-edit-dialog.component.scss']
})
export class LinkpoolEditDialogComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('form', { static: true })
  private form: NgForm;
  linkPoolForm: FormGroup;
  isNewLinkPool: boolean;
  linkPool: UrlPoolModel;
  subNewLinkPool: Subscription;
  subUpdateLinkPool: Subscription;

  get linkPath() {
    return this.linkPoolForm.get('linkPath');
  }
  get poolName() {
    return this.linkPoolForm.get('poolName');
  }

  constructor(private linkPoolService: LinkPoolService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UrlPoolModel>,
              @Inject(MAT_DIALOG_DATA) public data: {linkPool: UrlPoolModel}) {
    this.linkPool = this.data.linkPool;
    console.log('constructor this.linkPool = ' + JSON.stringify(this.linkPool));
    this.buildForm();
  }

  ngOnInit() {
    if (this.linkPool) {
      this.isNewLinkPool = false;
    } else {
      this.isNewLinkPool = true;
      this.linkPool = new UrlPoolModel();

    }
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subNewLinkPool) {
      this.subNewLinkPool.unsubscribe();
    }
    if (this.subUpdateLinkPool) {
      this.subUpdateLinkPool.unsubscribe();
    }
  }

  private buildForm() {
    this.linkPoolForm = this.formBuilder.group({
      poolName: ['', Validators.required],
      linkPath: ['', Validators.required]
    });
  }

  public resetForm() {
    this.linkPoolForm.reset({
      poolName: this.linkPool.poolName || '',
      linkPath: this.linkPool.linkPath || ''
    });
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
    console.log('After editedLinkPool');

    if (this.isNewLinkPool) {
      this.subNewLinkPool = this.linkPoolService.newLinkPool(editedLinkPool).subscribe(
        result => this.saveCompleted(result),
        error => this.saveFailed(error)
      );
    } else {
      this.subUpdateLinkPool =  this.linkPoolService.updateLinkPool(editedLinkPool).subscribe(
        () => this.saveCompleted(editedLinkPool),
        error => this.saveFailed(error)
      );
    }
  }

  private getEditedLinkPool(): UrlPoolModel {
    const formModel = this.linkPoolForm.value;

    return {
      linkpoolId: this.linkPool.linkpoolId,
      poolName: formModel.poolName,
      linkPath: formModel.linkPath
    };
  }

  private saveCompleted(linkPool?: UrlPoolModel) {
    console.log('--- saveCompleted  ----');
    if (linkPool) {
      this.linkPool = linkPool;
      /*if (this.isNewLinkPool) {
        //this.linkPool.linkpoolId = 0;
        // this.device.temperature = 0.0;
      }*/
    }
    console.log('saveCompleted linkPool = ' + JSON.stringify(linkPool));
    this.alertService.stopLoadingMessage();
    this.resetForm();
    this.alertService.showMessage('Успешно!', 'Данные сохранены', MessageSeverity.success);
    // this.resetForm();
    this.dialogRef.close(linkPool);
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
