import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Clase } from '../../interfaces/clase';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-asignaturas',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  clases: Clase[] = [];

  constructor(public database:DatabaseService, private storage:Storage) { }

  ngOnInit() {
    this.getClases();
  }

  async getClases() {
    const enlace = 'Clases';
    const parametro = 'user';
    let usr = await this.storage.get('Habilitado');
    this.database.getCollectionQuery<Clase>(enlace, parametro, usr).subscribe(res => this.clases = res);


  }


}
