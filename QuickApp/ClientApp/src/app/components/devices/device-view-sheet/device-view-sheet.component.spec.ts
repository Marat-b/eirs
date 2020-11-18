import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceViewSheetComponent } from './device-view-sheet.component';

describe('DeviceViewSheetComponent', () => {
  let component: DeviceViewSheetComponent;
  let fixture: ComponentFixture<DeviceViewSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceViewSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceViewSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
