import { AddContextComponent } from './add-context/add-context.component';
import { ContextComponent } from './index-context/context.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ContextComponent,
    AddContextComponent,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    AddContextComponent,
  ]
})
export class ContextsModule { }
