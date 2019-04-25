import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceStringPipe } from './replace-string.pipe';
@NgModule({
  imports: [CommonModule],
  declarations: [ReplaceStringPipe],
  exports: [ReplaceStringPipe]
})
export class PipeModule {}
