import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { PipeModule } from '../custom-pipe/custom-pipe.module';
import { NgbdLoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [CommonModule, TranslateModule, DetailRoutingModule, NgbModule, PipeModule, ReactiveFormsModule],
  declarations: [DetailComponent, NgbdLoginModalComponent]
})
export class DetailModule {}
