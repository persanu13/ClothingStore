import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClothingModalComponent } from './add-clothing-modal.component';

describe('AddClothingModalComponent', () => {
  let component: AddClothingModalComponent;
  let fixture: ComponentFixture<AddClothingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClothingModalComponent]
    });
    fixture = TestBed.createComponent(AddClothingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
