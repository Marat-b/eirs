import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceVolumeComponent } from './device-volume.component';

describe('DeviceVolumeComponent', () => {
  let component: DeviceVolumeComponent;
  let fixture: ComponentFixture<DeviceVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
