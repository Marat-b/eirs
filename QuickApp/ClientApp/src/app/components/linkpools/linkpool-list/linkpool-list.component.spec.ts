import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpoolListComponent } from './linkpool-list.component';

describe('LinkpoolListComponent', () => {
  let component: LinkpoolListComponent;
  let fixture: ComponentFixture<LinkpoolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpoolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
