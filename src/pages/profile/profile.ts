import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { DicaPage } from '../dica/dica';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  fotoPerfil: boolean = false;
  facebook =  {
    nome: '',
    fotoUrl: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth, public toastCtrl: ToastController) {

      //pegando o email do usuario loagaod e psassanod para variavel email
    this.email = fire.auth.currentUser.email;
    this.facebook.nome = fire.auth.currentUser.displayName;
    this.facebook.fotoUrl = fire.auth.currentUser.photoURL;

    //mostrando a foto do perfil
    if(this.facebook.fotoUrl == null){
      this.fotoPerfil = false;
    }else {
      this.fotoPerfil = true;
    }

  }

  voltar(){
    this.navCtrl.setRoot(DicaPage);
  }



}
