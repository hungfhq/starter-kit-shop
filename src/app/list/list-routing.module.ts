import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ListComponent } from './list.component';
import { Shop } from '@app/shop/shop.service';

const routes: Routes = [
  Shop.childRoutes([
    {
      path: ':category',
      component: ListComponent,
      data: { title: extract('List...') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ListRoutingModule {}
