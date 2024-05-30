import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ClothesService } from '../helpers/clothes.service';
import { Clothing } from '../helpers/clothes';

@Component({
  selector: 'app-clothing-modal',
  templateUrl: './clothing-modal.component.html',
  styleUrls: ['./clothing-modal.component.scss'],
})
export class ClothingModalComponent implements OnInit {
  @Input() clothing!: Clothing;
  @Input() modal!: any;
  @Output() addClothing = new EventEmitter<any>();
  clothingForm!: FormGroup<any>;

  constructor(
    private formBuilder: FormBuilder,
    private clothesService: ClothesService,
    private notificationService: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.createClothingForm();
    if (this.clothing) {
      this.name = this.clothing.name;
      this.category = this.clothing.category;
      this.gender = this.clothing.gender;
      this.size = this.clothing.size;
      this.price = this.clothing.price;
    }
  }

  createClothingForm() {
    this.clothingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      size: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
    });
  }

  handleSubmit(): void {
    const name = this.clothingForm.controls['name'].value;
    const category = this.clothingForm.controls['category'].value;
    const gender = this.clothingForm.controls['gender'].value;
    const size = this.clothingForm.controls['size'].value;
    const price = this.clothingForm.controls['price'].value;
    if (!this.clothing) {
      this.addClothingCase(name, category, gender, size, price);
    } else {
      this.updateClothingCase(name, category, gender, size, price);
    }
  }

  addClothingCase(
    name: string,
    category: string,
    gender: string,
    size: string,
    price: number
  ): void {
    this.clothesService
      .createNewClothing(name, category, gender, size, price)
      .subscribe({
        next: (res) => {
          this.notificationService.success(
            'Success',
            'Product added successfully'
          );
          this.addClothing.emit(res);
          this.clothingForm.reset();
        },
        error: () => {
          this.notificationService.error('Error', 'Something went wrong');
        },
      });
  }

  updateClothingCase(
    name: string,
    category: string,
    gender: string,
    size: string,
    price: number
  ): void {
    this.clothesService
      .editClothing(this.clothing._id, name, category, gender, size, price)
      .subscribe({
        next: () => {
          this.notificationService.success(
            'Success',
            'Product edit successfully'
          );
          this.clothing.name = name;
          this.clothing.category = category;
          this.clothing.gender = gender;
          this.clothing.size = size;
          this.clothing.price = price;
          this.modal?.destroy();
        },
        error: () => {
          this.notificationService.error('Error', 'Something went wrong');
        },
      });
  }

  // -------------- form setters ------------------
  set name(value: any) {
    this.clothingForm.controls['name'].setValue(value);
  }
  set category(value: any) {
    this.clothingForm.controls['category'].setValue(value);
  }

  set gender(value: any) {
    this.clothingForm.controls['gender'].setValue(value);
  }
  set size(value: any) {
    this.clothingForm.controls['size'].setValue(value);
  }

  set price(value: any) {
    this.clothingForm.controls['price'].setValue(value);
  }

  // -------------- form getters ------------------
  get name(): AbstractControl {
    return this.clothingForm.controls['name'];
  }

  get category(): AbstractControl {
    return this.clothingForm.controls['category'];
  }

  get gender(): AbstractControl {
    return this.clothingForm.controls['gender'];
  }

  get size(): AbstractControl {
    return this.clothingForm.controls['size'];
  }
  get price(): AbstractControl {
    return this.clothingForm.controls['price'];
  }
}
