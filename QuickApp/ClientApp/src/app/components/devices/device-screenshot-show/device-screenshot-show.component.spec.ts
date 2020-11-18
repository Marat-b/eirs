import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceScreenshotShowComponent } from './device-screenshot-show.component';

describe('DeviceScreenshotShowComponent', () => {
  let component: DeviceScreenshotShowComponent;
  let fixture: ComponentFixture<DeviceScreenshotShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceScreenshotShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceScreenshotShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
