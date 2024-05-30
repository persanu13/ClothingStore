import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Clothing } from '../helpers/clothes';
import { ClothesService } from '../helpers/clothes.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClothingModalComponent } from '../clothing-modal/clothing-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  clothes: Clothing[] = [];

  constructor(
    private clothesService: ClothesService,
    private notificationService: NzNotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getListOfClothes();
  }

  getListOfClothes(): void {
    this.clothesService.getListOfClothes().subscribe({
      next: (res) => {
        this.clothes = res;
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

  handleAddClothing(): void {
    const modal: any = this.modal.create({
      nzTitle: 'Add Clothing',
      nzContent: ClothingModalComponent,
      nzFooter: [
        {
          label: 'Anulare',
          onClick: () => modal.destroy(),
        },
      ],
    });
    const instance = modal.getContentComponent() as ClothingModalComponent;
    instance.addClothing.subscribe((clothing) => {
      this.clothes = [clothing, ...this.clothes];
    });
  }

  handleDeleteClothing(id: string): void {
    this.clothesService.deleteClothing(id).subscribe({
      next: (res) => {
        this.clothes = this.clothes.filter((item) => item._id !== id);
        this.notificationService.success(
          'Success',
          'Item successfully deleted'
        );
      },
      error: (err) => {
        this.notificationService.error('Error', `Something went wrong: ${err}`);
      },
    });
  }

  handleUpdateClothing(clothing: Clothing): void {
    const modal: any = this.modal.create({
      nzTitle: 'Edit Clothingt',
      nzContent: ClothingModalComponent,
      nzFooter: [
        {
          label: 'Anulare',
          onClick: () => modal.destroy(),
        },
      ],
    });
    const instance = modal.getContentComponent() as ClothingModalComponent;
    instance.clothing = clothing;
    instance.modal = modal;
  }
}
