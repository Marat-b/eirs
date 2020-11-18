import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceScreenshotDialogComponent } from './device-screenshot-dialog.component';

describe('DeviceScreenshotDialogComponent', () => {
  let component: DeviceScreenshotDialogComponent;
  let fixture: ComponentFixture<DeviceScreenshotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceScreenshotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceScreenshotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
