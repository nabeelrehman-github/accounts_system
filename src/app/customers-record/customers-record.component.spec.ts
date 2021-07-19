import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRecordComponent } from './customers-record.component';

describe('CustomersRecordComponent', () => {
  let component: CustomersRecordComponent;
  let fixture: ComponentFixture<CustomersRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
