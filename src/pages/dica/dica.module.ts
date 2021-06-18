import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DicaPage } from './dica';

@NgModule({
  declarations: [
    DicaPage,
  ],
  imports: [
    IonicPageModule.forChild(DicaPage),
  ],
})
export class DicaPageModule {}
