import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationarticleComponent } from './creationarticle.component';

describe('CreationarticleComponent', () => {
  let component: CreationarticleComponent;
  let fixture: ComponentFixture<CreationarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
