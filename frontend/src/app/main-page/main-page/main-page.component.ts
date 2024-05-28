import { Component } from '@angular/core';
import { Clothes } from '../helpers/clothes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  clothing: Clothes[] = [  {
    name: "Apollo",
    type: "Tee-Shirt",
    gender: "Male",
    size: 32,
    price: 89.99
  }];
}
