import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {AngularFireAuth} from 'angularfire2/auth';

/**
 * Generated class for the RecuperarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, public fire: AngularFireAuth) {
  }

  recuperar(){
    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});

    this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
    .then(() => {
      //caso tenha suscesso
      toast.setMessage('Solicitação enviada para seu email')
      toast.present();
      //o pop vai fazer ele voltar
      this.navCtrl.pop();
    }).catch((error: any) => {

      if(error.code == 'auth/invalid-email'){
        toast.setMessage('Email invalido, confira o seu email');
      };

      if(error.code == 'auth/user-not-found'){
        toast.setMessage('Nenhum usuario encontrado neste email')
      }

      toast.present();


    });


  }



}
