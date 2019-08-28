import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeuserComponent } from './administrativeuser.component';

describe('AdministrativeuserComponent', () => {
  let component: AdministrativeuserComponent;
  let fixture: ComponentFixture<AdministrativeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
