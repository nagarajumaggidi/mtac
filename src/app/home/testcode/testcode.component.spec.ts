import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcodeComponent } from './testcode.component';

describe('TestcodeComponent', () => {
  let component: TestcodeComponent;
  let fixture: ComponentFixture<TestcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
