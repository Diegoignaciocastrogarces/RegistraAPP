import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassrecoverPageRoutingModule } from './passrecover-routing.module';

import { PassrecoverPage } from './passrecover.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassrecoverPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PassrecoverPage]
})
export class PassrecoverPageModule {}
