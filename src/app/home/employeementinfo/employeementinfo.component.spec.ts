import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeementinfoComponent } from './employeementinfo.component';

describe('EmployeementinfoComponent', () => {
  let component: EmployeementinfoComponent;
  let fixture: ComponentFixture<EmployeementinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeementinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeementinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
