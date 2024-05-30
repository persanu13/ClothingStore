import { Component, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Clothing } from '../helpers/clothes';
import { ClothesService } from '../helpers/clothes.service';
import { AddClothingModalComponent } from '../add-clothing-modal/add-clothing-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  clothes: Clothing[] = [];

  @ViewChild(AddClothingModalComponent) addClothingModal!: AddClothingModalComponent;

  constructor(
    private clothesService: ClothesService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getListOfClothes();
  }

  getListOfClothes(): void {
    this.clothesService.getListOfClothes().subscribe({
      next: (res) => {
        this.clothes = res;
        console.log(this.clothes);
        this.notificationService.success(
          'Succes',
          'The list was succesfully retrived'
        );
      },
      error: (err) => {
        this.clothes = [];
        this.notificationService.error('Error', `Something went wrong: ${err}`);
      },
    });
  }

  deleteItem(id: string): void {
    this.clothesService.deleteClothing(id).subscribe({
      next: (res) => {
        this.clothes = this.clothes.filter(item => item._id !== id);
        this.notificationService.success(
          'Success',
          'Item successfully deleted'
        );
      },
      error: (err) => {
        this.notificationService.error('Error', `Something went wrong: ${err}`);
      }
    });
  }

  handleAddClothing(clothing: any): void {
    this.clothesService.createNewClothing(clothing.name, clothing.category, '', clothing.size, clothing.price).subscribe({
      next: (res) => {
        this.clothes.push(res);
        this.notificationService.success(
          'Success',
          'Clothing item successfully added'
        );
      },
      error: (err) => {
        this.notificationService.error('Error', `Something went wrong: ${err}`);
      }
    });
  }
  
}
