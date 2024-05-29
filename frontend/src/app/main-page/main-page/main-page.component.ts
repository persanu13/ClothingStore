import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Clothing } from '../helpers/clothes';
import { ClothesService } from '../helpers/clothes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  clothes: Clothing[] = [];

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
}
