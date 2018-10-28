import { Component } from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.carregarResultado();

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

  carregarResultado() {
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
  }

  async showAlert() {

    const alert = await this.alertController.create({
      message: 'Deseja zerar o resultado? <br /><strong>OBS: Essa ação é irreversível</strong>',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Sim',
          handler: () => {
            this.resetResultado();
          }
        }
      ]
    });    

    await alert.present();
  }
  
  zerarResultado() {

    this.showAlert();
  }

  resetResultado() {
    let db = { Detestei: 0, NaoGostei: 0, Indiferente:0, Gostei:0, Adorei: 0 };
  
    window.localStorage.setItem("rostinhos", JSON.stringify(db));
  
    this.carregarResultado();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
