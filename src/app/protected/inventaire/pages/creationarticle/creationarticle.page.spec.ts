import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationarticlePage } from './creationarticle.page';

describe('CreationarticlePage', () => {
  let component: CreationarticlePage;
  let fixture: ComponentFixture<CreationarticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationarticlePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationarticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
