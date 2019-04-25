import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ContentModule } from '@app/content/content.module';
import { ListModule } from '@app/list/list.module';
import { DetailModule } from '@app/detail/detail.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    ContentModule,
    ListModule,
    DetailModule,
    ShopRoutingModule
  ],
  declarations: [ShopComponent]
})
export class ShopModule {}
