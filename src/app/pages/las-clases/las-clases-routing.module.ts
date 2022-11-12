import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LasClasesPage } from './las-clases.page';

const routes: Routes = [
  {
    path: '',
    component: LasClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LasClasesPageRoutingModule {}
