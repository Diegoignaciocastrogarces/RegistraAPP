import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Clase } from '../../interfaces/clase';
import { Usuario } from '../../interfaces/usuario';
import { Asignaturas } from '../../interfaces/asignaturas';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  asignaturas: Asignaturas[] = [];
  id: string;

  constructor(public database: DatabaseService, private storage: Storage, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAsignaturas();
  }

  async getAsignaturas() {
    const enlace = 'Asignaturas';;
    //let userDatabase = this.database.getCollectionChanges<Usuario>('Usuarios').subscribe(res => this.usuarios = res);
    let usr = await this.storage.get('Habilitado');
    this.database.getCollectionChanges<Asignaturas>(enlace).subscribe(data => this.asignaturas = data);


    let list = ['INI4140-001D', 'MAT4140-001D', 'PGY4121-006D'];
    list.push('ASY4131-002D');

  }

}


