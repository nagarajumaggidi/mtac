import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthenicgroupComponent } from './ethenicgroup.component';

describe('EthenicgroupComponent', () => {
  let component: EthenicgroupComponent;
  let fixture: ComponentFixture<EthenicgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthenicgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthenicgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
