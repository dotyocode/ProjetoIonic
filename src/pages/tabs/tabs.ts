import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {DicaPage} from '../dica/dica';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

    DicaPage = DicaPage;

}
