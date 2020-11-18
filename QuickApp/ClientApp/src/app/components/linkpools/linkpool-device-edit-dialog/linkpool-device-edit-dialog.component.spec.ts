import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpoolDeviceEditDialogComponent } from './linkpool-device-edit-dialog.component';

describe('LinkpoolDeviceEditDialogComponent', () => {
  let component: LinkpoolDeviceEditDialogComponent;
  let fixture: ComponentFixture<LinkpoolDeviceEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpoolDeviceEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpoolDeviceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
