import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public alertController: AlertController) {}

  images = [
    { url: 'assets/imgs/detestei.png', nome: 'Detestei', id: 1},
    { url: 'assets/imgs/nao_gostei.png', nome: 'NaoGostei', id: 2},
    { url: 'assets/imgs/indiferente.png', nome: 'Indiferente', id: 3},
    { url: 'assets/imgs/gostei.png', nome: 'Gostei', id: 4},
    { url: 'assets/imgs/adorei.png', nome: 'Adorei', id: 5}
  ]

  salvar(img){
//    console.log(img);
//    console.log(img.nome);
   
    let db = JSON.parse(window.localStorage.getItem("rostinhos"));
    if(!db) {
      db = { Detestei: 0, NaoGostei: 0, Indiferente:0, Gostei:0, Adorei: 0 };
    }

    db[img.nome]++;

    window.localStorage.setItem("rostinhos", JSON.stringify(db));

    console.log(db);
    this.showAlert(img);
  }

  async showAlert(img) {

    const alert = await this.alertController.create({
//      header: 'Selecionado o item ' + img.nome,
//      subHeader: 'Selecionado o item ' + img.nome,
      message: img.nome,
      buttons: ['OK']
    });

    await alert.present();
  }
}
