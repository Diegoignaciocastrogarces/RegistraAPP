import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore:AngularFirestore) { }

  createDocument<tipo>(data: tipo, enlace: string) {
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.add(data);

  }

  getDocumentId(enlace: string, parametro: string, user: any): Subscription {
    let f = this.firestore.collection(enlace, ref => ref.where(parametro, '==', user)).get().subscribe(data => data.forEach(
      doc => {
        const documentId = doc.id;
        return documentId;
      }));
    return f;
  }


  getDocumentByField<tipo>(enlace: string, parametro: string, busqueda: any) {
    this.firestore.collection<tipo>(enlace, ref => ref.where(parametro, '==', busqueda));
  }

  getCollectionOfDocument<tipo>(enlace: string, idDocumento: any, subColeccion: string): Observable<tipo[]> {
    const ref: AngularFirestoreCollection<tipo> = this.firestore.collection(enlace).doc(idDocumento).collection<tipo>(subColeccion);
    return ref.valueChanges();
  }

  getCollectionChanges<tipo>(enlace:string): Observable<tipo[]> {
    const ref = this.firestore.collection<tipo>(enlace);
    return ref.valueChanges();
  }

  getCollectionQuery<tipo>(enlace: string, parametro: string, busqueda: any): Observable<tipo[]> {
    const itemsCollection: AngularFirestoreCollection<tipo> =
      this.firestore.collection<tipo>(enlace, ref => ref.where(parametro, '==',busqueda));

    return itemsCollection.valueChanges();
  }
}
