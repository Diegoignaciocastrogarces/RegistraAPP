import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ValidacionUsuario } from '../../interfaces/validacion-usuario';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario:ValidacionUsuario={
    desc:'',
    user:''
  };

  constructor(private storage:Storage, private alertController:AlertController, private navCtrl:NavController) { }

  ngOnInit() {
    this.mostrarUser();
  }

  async mostrarUser() {
    let usr = await this.storage.get('Habilitado');
    this.usuario.user = usr;

  };

  async exitConfirm() {
    this.presentAlert('¿Esta seguro que desea cerrar sesión?');
  }


  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'personalizada',
      header: 'Confirmar cerrar sesión',
      message: mensaje,
      buttons: [{text:'Si', handler: () =>  {
        this.storage.remove('Habilitado');
        this.navCtrl.navigateForward('login');}}, 'No'],

    });

    await alert.present();
  }

}
