import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [CommonModule, NgbModule, PageNotFoundRoutingModule],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
