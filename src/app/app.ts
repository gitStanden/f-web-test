import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FursuitItem, ItemType } from '../models/fursuit-items';
import { MaterialModule } from '../assets/material/material-module';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  imports: [MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'f-web-test';
  expansionPanel = viewChild.required(MatExpansionPanel);

  fursuitMainItems: FursuitItem[] = [
    {item: 'Head', price: 1000, itemType: ItemType.mainItem},
    {item: 'Paws', price: 200, itemType: ItemType.mainItem},
    {item: 'Feet Paws', price: 400, itemType: ItemType.mainItem},
    {item: 'Tail', price: 500, itemType: ItemType.mainItem},
    {item: 'Full Suit (Plantigrade)', price: 1500, itemType: ItemType.mainItem},
    {item: 'Full Suit (Digigrade)', price: 2000, itemType: ItemType.mainItem}
  ];

  fursuitExtraItems: FursuitItem[] = [
    {item: 'Removable Eyelids', price: 100, itemType: ItemType.extraItem},
    {item: 'Antlers', price: 200, itemType: ItemType.extraItem},
    {item: 'Wings', price: 450, itemType: ItemType.extraItem},
    //{item: 'Markings', price: 40, itemType: ItemType.extraItem, quantity: 1},
    {item: 'Colours', price: 20, itemType: ItemType.extraItem},
  ];

  selectedMainItems: FursuitItem[] = [];
  selectedExtraItems: FursuitItem[] = [];
  suitDecorationNumber: number = 0;
  totalPrice: number = 0;

  onItemSelection(event: MatCheckboxChange, item: FursuitItem) {
    if (event.checked) {
      // add item
      switch (item.itemType) {
        case ItemType.mainItem:
          this.selectedMainItems.push(item);
          break;
        case ItemType.extraItem:
          this.selectedExtraItems.push(item);
          break;
      };
    }
    else {
      //remove item
      switch (item.itemType) {
        case ItemType.mainItem:
          this.selectedMainItems = this.selectedMainItems.filter(x => x != item);
          break;
        case ItemType.extraItem:
          this.selectedExtraItems = this.selectedExtraItems.filter(x => x != item);
          break;
      };
    };
    this.calculateTotalPrice();
  }

  onMarkingsSlider(number: number) {
    // remove markings from array
    if (number == 0) {
      this.fursuitExtraItems = this.fursuitExtraItems.filter(x => x.item != "Markings");
    }

    //check if item aleady exists in array
    let markingItem: FursuitItem = this.selectedExtraItems.filter(x => x.item == "Markings")[0];

    // if item doesn't exist, create new one, else update values of current item
    if (!markingItem && number > 0) {
      markingItem =
        {item: 'Markings', price: 40 * number, itemType: ItemType.extraItem, quantity: number}
      this.selectedExtraItems.push(markingItem);
    } else if (markingItem && number > 0) {
      markingItem.price = 40 * number;
      markingItem.quantity = number;
    }
    
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let priceToReturn = 0;

    this.selectedMainItems.forEach(item => {
      priceToReturn += item.price;
    });

    this.selectedExtraItems.forEach(item => {
      priceToReturn += item.price;
    });

    this.expansionPanel().open();
    this.totalPrice = priceToReturn;
  }
}
