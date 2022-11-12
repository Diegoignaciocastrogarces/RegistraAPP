import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardGuard implements CanActivate {

  constructor(private navCtrl:NavController, private storage:Storage) {


  };

  async validar() {
    if(await this.storage.get('Habilitado')) {
      console.log('deberia pasar');
      this.navCtrl.navigateRoot('home');
      return false;
    }
    else {
      return true;
    };

  };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validar();
  }

}
