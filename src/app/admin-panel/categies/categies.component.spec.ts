import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategiesComponent } from './categies.component';

describe('CategiesComponent', () => {
  let component: CategiesComponent;
  let fixture: ComponentFixture<CategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
