import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkpoolViewComponent } from './linkpool-view.component';

describe('LinkpoolViewComponent', () => {
  let component: LinkpoolViewComponent;
  let fixture: ComponentFixture<LinkpoolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkpoolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkpoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
