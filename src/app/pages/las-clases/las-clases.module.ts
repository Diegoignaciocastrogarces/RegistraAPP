import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LasClasesPageRoutingModule } from './las-clases-routing.module';

import { LasClasesPage } from './las-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LasClasesPageRoutingModule
  ],
  declarations: [LasClasesPage]
})
export class LasClasesPageModule {}
