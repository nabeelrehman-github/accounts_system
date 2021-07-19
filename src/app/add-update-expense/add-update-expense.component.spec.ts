import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateExpenseComponent } from './add-update-expense.component';

describe('AddUpdateExpenseComponent', () => {
  let component: AddUpdateExpenseComponent;
  let fixture: ComponentFixture<AddUpdateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
