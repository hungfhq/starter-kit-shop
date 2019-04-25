import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';

import { PipeModule } from '../custom-pipe/custom-pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbdLoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ContentRoutingModule, NgbModule, PipeModule],
  declarations: [ContentComponent, NgbdLoginModalComponent]
})
export class ContentModule {}
