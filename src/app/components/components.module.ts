import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainheaderComponent } from './mainheader/mainheader.component';
import { LogheaderComponent } from './logheader/logheader.component';
import { DuocfooterComponent } from './duocfooter/duocfooter.component';



@NgModule({
  declarations: [MainheaderComponent,LogheaderComponent,DuocfooterComponent],
  exports: [MainheaderComponent,LogheaderComponent,DuocfooterComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
