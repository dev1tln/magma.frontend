import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestitutionPage } from './restitution.page';

describe('RestitutionComponent', () => {
  let component: RestitutionPage;
  let fixture: ComponentFixture<RestitutionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestitutionPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestitutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
