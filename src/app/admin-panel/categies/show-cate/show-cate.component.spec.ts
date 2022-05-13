import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCateComponent } from './show-cate.component';

describe('ShowCateComponent', () => {
  let component: ShowCateComponent;
  let fixture: ComponentFixture<ShowCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
