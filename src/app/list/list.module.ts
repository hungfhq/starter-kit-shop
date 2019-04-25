import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { PipeModule } from '../custom-pipe/custom-pipe.module';
import { NgbdLoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ListRoutingModule, NgbModule, PipeModule, ReactiveFormsModule],
  declarations: [ListComponent, NgbdLoginModalComponent]
})
export class ListModule {}
