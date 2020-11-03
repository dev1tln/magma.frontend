import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestitutionComponent } from './restitution.component';

describe('RestitutionComponent', () => {
  let component: RestitutionComponent;
  let fixture: ComponentFixture<RestitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
