import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Clase } from '../../interfaces/clase';
import { Storage } from '@ionic/storage-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.page.html',
  styleUrls: ['./qr-page.page.scss'],
})
export class QrPagePage implements OnInit {

  class: Clase = {
    name:'',
    hora: null,
    fecha: null,
    user: ''
  };

  teacherEmail: string;

  constructor(private qrScanner:QRScanner, private alertController:AlertController, public database:DatabaseService,
    private storage:Storage, private socialSharing: SocialSharing) { }

  ngOnInit() {


  }

  /*async ionViewWillEnter(){
    await this.startScan();
  }*/

  async presentAlert(mensaje:any) {
    const alert = await this.alertController.create({
      cssClass: 'personalizada',
      header: 'Listo',
      message: 'Se ha registrado su asistencia a la clase: ' + mensaje,
      buttons: [{text:'OK', handler: () => {
        document.getElementsByTagName('ion-content')[0].style.opacity = '1';}}],
    });

    await alert.present();

  }

  startScan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
     if (status.authorized) {
      this.qrScanner.show();
      //document.getElementsByTagName('ion-header')[0].style.opacity='0';
      document.getElementsByTagName('ion-content')[0].style.opacity = '0';
      //document.getElementsByTagName('ion-app')[0].style.opacity = '0';

      // start scanning
      let scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
        console.log('Se ha escaneado: ', text);
        this.presentAlert(text);
        this.qrScanner.hide();
        scanSub.unsubscribe();

        let hour = new Date();
        let date = new Date();
        let usr = await this.storage.get('Habilitado');
        this.class.user = usr;
        this.class.hora = hour.getHours() + ':' + hour.getMinutes();
        this.class.fecha = date.getDate() + '/' + Number(date.getMonth()+1).toString() + '/' + date.getFullYear();
        this.class.name = text;
        //alert(usr + '|' + hour + '|' + date + '|' + text);
        const data = this.class;
        const enlace = 'Clases';
        this.database.createDocument<Clase>(data, enlace);

        //document.getElementsByTagName('ion-app')[0].style.opacity = '1';

        this.database.firestore.collection('Asignaturas').doc(text).get().subscribe(res => {
          if(res.exists) {
            this.teacherEmail = res.get('teacherEmail');

            this.socialSharing.shareViaEmail('El alumno '+ this.class.user + ' se ha registrado a su clase: ' + text, 'RegistrApp',
              [this.teacherEmail]).then(() => {

              });

          }
        });

        alert(this.teacherEmail);

       });

     } else if (status.denied) {


     } else {

     }
  })
  .catch((e: any) => console.log('Error is', e));

  }

}

