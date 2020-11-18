import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceVolumeSheetComponent } from './device-volume-sheet.component';

describe('DeviceVolumeSheetComponent', () => {
  let component: DeviceVolumeSheetComponent;
  let fixture: ComponentFixture<DeviceVolumeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceVolumeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceVolumeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
