import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { DetailComponent } from './detail.component';
import { Shop } from '@app/shop/shop.service';

const routes: Routes = [
  Shop.childRoutes([
    {
      path: ':category/:brand/:link',
      component: DetailComponent,
      data: { title: extract('Detail...') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DetailRoutingModule {}
