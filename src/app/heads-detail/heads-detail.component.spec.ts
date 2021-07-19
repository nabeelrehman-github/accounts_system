import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsDetailComponent } from './heads-detail.component';

describe('HeadsDetailComponent', () => {
  let component: HeadsDetailComponent;
  let fixture: ComponentFixture<HeadsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
