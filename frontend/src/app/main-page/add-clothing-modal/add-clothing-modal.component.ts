import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-clothing-modal',
  templateUrl: './add-clothing-modal.component.html',
  styleUrls: ['./add-clothing-modal.component.scss']
})
export class AddClothingModalComponent {
  @Output() addClothing = new EventEmitter<any>();
  isVisible = false;
  addClothingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addClothingForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      size: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }
  

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.addClothingForm.valid) {
      this.addClothing.emit(this.addClothingForm.value);
      this.isVisible = false;
      this.addClothingForm.reset();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
