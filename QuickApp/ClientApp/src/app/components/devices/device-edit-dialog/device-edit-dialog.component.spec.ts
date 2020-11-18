import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditDialogComponent } from './device-edit-dialog.component';

describe('DeviceEditDialogComponent', () => {
  let component: DeviceEditDialogComponent;
  let fixture: ComponentFixture<DeviceEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
