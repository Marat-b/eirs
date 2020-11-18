import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceViewDialogComponent } from './device-view-dialog.component';

describe('DeviceViewDialogComponent', () => {
  let component: DeviceViewDialogComponent;
  let fixture: ComponentFixture<DeviceViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
