import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployementtypeComponent } from './employementtype.component';

describe('EmployementtypeComponent', () => {
  let component: EmployementtypeComponent;
  let fixture: ComponentFixture<EmployementtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployementtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployementtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
