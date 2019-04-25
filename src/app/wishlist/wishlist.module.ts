import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WishListRoutingModule } from './wishlist-routing.module';
import { WishListComponent } from './wishlist.component';

import { PipeModule } from '../custom-pipe/custom-pipe.module';

@NgModule({
  imports: [CommonModule, TranslateModule, WishListRoutingModule, NgbModule, PipeModule],
  declarations: [WishListComponent]
})
export class WishListModule {}
