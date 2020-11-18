import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpoolEditDialogComponent } from './linkpool-edit-dialog.component';

describe('LinkpoolEditDialogComponent', () => {
  let component: LinkpoolEditDialogComponent;
  let fixture: ComponentFixture<LinkpoolEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpoolEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpoolEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
