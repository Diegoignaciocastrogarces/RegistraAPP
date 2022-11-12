import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Clase } from '../../interfaces/clase';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-las-clases',
  templateUrl: './las-clases.page.html',
  styleUrls: ['./las-clases.page.scss'],
})
export class LasClasesPage implements OnInit {

  clases: Clase[] = [];
  id: string;

  constructor(private storage: Storage, private activatedRoute: ActivatedRoute, public database: DatabaseService) {}

  ngOnInit() {
    this.getClases();

  }

  async getClases() {

    const enlace = 'Clases';
    const parametro = 'user';
    let usr = await this.storage.get('Habilitado');
    console.log('//////////////////////');
    console.log(usr);

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.database.firestore.collection<Clase>(enlace, ref => ref.where(parametro, '==', usr).where('name', '==', this.id)).
    valueChanges().subscribe(data => this.clases = data);

  }

}
