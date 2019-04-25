import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';

import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: 'pagenotfound', component: PageNotFoundComponent, data: { title: extract('Sorry...') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PageNotFoundRoutingModule {}
