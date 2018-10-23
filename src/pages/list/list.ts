import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    let db = JSON.parse(window.localStorage.getItem("rostinhos"));
    if(!db) {
      db = { Detestei: 0, NaoGostei: 0, Indiferente:0, Gostei:0, Adorei: 0 };
    }

    this.items.push({ title: 'Detestei', note: db['Detestei'], icon: 'assets/imgs/detestei.png'});
    this.items.push({ title: 'NaoGostei', note: db['NaoGostei'], icon: 'assets/imgs/nao_gostei.png'});
    this.items.push({ title: 'Indiferente', note: db['Indiferente'], icon: 'assets/imgs/indiferente.png'});
    this.items.push({ title: 'Gostei', note: db['Gostei'], icon: 'assets/imgs/gostei.png'});
    this.items.push({ title: 'Adorei', note: db['Adorei'], icon: 'assets/imgs/adorei.png'});

/*    
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
*/    
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
