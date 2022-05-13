import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCateComponent } from './add-edit-cate.component';

describe('AddEditCateComponent', () => {
  let component: AddEditCateComponent;
  let fixture: ComponentFixture<AddEditCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
