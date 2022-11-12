import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../../interfaces/usuario';
import { ValidacionUsuario } from '../../interfaces/validacion-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario={

    username:'',
    password:'',
    };

    logeado:ValidacionUsuario={
      desc:'Habilitado',
      user: '',
    };

  constructor(private router:Router,private alertController:AlertController, private menu:MenuController, private storage:Storage) {

  }

  ngOnInit() {

  }


   onSubmit() {
     this.logInUser();
    /*
      let navextras:NavigationExtras={
        state:{
          miusuario:this.user
        }
      };

      this.router.navigate(['/home'],navextras);
    }*/


  }

    async logInUser() {
      let userOk = await this.storage.get(this.usuario.username);
      if(userOk!=null){
        console.log('Usuario encontrado: ' + userOk.username);
        const val = await this.storage.set(this.logeado.desc, this.usuario.username);
        console.log(val);
        document.location.href='home';
      }
      else{
        this.presentAlert('No hemos encontrado ningún usuario con esas credenciales');
      }

    }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'personalizada',
      header: 'Error al Ingresar',
      subHeader: 'Usuario no encontrado',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*ionViewDidEnter(){

    this.menu.enable(false, 'first');
  }

  ionViewWillLeave(){

    this.menu.enable(true, 'first');
  }*/

}
