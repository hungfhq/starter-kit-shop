import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { ContentComponent } from './content.component';
import { Shop } from '@app/shop/shop.service';

const routes: Routes = [
  Shop.childRoutes([
    {
      path: '',
      component: ContentComponent,
      data: { title: extract('All Products') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule {}
