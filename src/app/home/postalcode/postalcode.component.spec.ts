import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalcodeComponent } from './postalcode.component';

describe('PostalcodeComponent', () => {
  let component: PostalcodeComponent;
  let fixture: ComponentFixture<PostalcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostalcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostalcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
