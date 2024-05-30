import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingModalComponent } from './clothing-modal.component';

describe('ClothingModalComponent', () => {
  let component: ClothingModalComponent;
  let fixture: ComponentFixture<ClothingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothingModalComponent]
    });
    fixture = TestBed.createComponent(ClothingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
