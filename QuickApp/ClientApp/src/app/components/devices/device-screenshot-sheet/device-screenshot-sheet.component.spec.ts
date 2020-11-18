import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceScreenshotSheetComponent } from './device-screenshot-sheet.component';

describe('DeviceScreenshotSheetComponent', () => {
  let component: DeviceScreenshotSheetComponent;
  let fixture: ComponentFixture<DeviceScreenshotSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceScreenshotSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceScreenshotSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
