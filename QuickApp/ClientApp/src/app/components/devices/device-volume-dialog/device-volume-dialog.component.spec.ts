import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceVolumeDialogComponent } from './device-volume-dialog.component';

describe('DeviceVolumeDialogComponent', () => {
  let component: DeviceVolumeDialogComponent;
  let fixture: ComponentFixture<DeviceVolumeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceVolumeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceVolumeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
