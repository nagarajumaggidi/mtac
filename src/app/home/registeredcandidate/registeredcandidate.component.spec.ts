import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredcandidateComponent } from './registeredcandidate.component';

describe('RegisteredcandidateComponent', () => {
  let component: RegisteredcandidateComponent;
  let fixture: ComponentFixture<RegisteredcandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredcandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
