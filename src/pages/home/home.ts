import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

import {RegisterPage} from '../register/register';
import { RecuperarPage } from '../recuperar/recuperar';

import {AngularFireAuth} from 'angularfire2/auth';
import { Users } from './users';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //trazendo a classe do Users para aqui com as tipagens
  tabBarElement: any;
  users: Users = new Users();

  @ViewChild('usuario') email;
  @ViewChild('senha') password;


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth,
    public alertCtrl: AlertController) {

      //declarando o tabbar
      this.tabBarElement = document.querySelector('.show-tabbar')

  }

      //metodo para nao aparecer a tabsPage

      ngAfterViewInit(){
        let tabs = document.querySelectorAll('.show-tabbar');
        if(tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
          })
        }
      }

      ionViewWillLeave(){
        let tabs = document.querySelectorAll('.show-tabbar');

        if(tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
          })
        }
      }




     //metodo para o refresh
     logoIntro(){
      //comando para trazer o refresh
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      //tempo de atualização
      setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
      }, 2000);

    }


  entrar(){



    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      //caso logar vai vir aqui
      console.log("Data do login: ", data);

      this.users.email = this.email.value;
      this.users.senha = this.password.value;

      this.navCtrl.setRoot(TabsPage);
      toast.setMessage("Usuario logado com sucesso");


    }).catch((error: any) => {
      // vai vir os dados de Errors

      if(error.code == 'auth/invalid-email'){
        toast.setMessage('Login invalido, verifique seu email')
      };

      if(error.code == 'auth/user-disabled'){
        toast.setMessage('Esse email foi desativado')
      }

      if(error.code == 'auth/user-not-found'){
        toast.setMessage('Usuario não encontrado, tente novamente')
      }

      if(error.code == 'auth/wrong-password'){
        toast.setMessage('Senha incorreta, tente novamente')
      }
      toast.present();

    });

  }

  cadastrar(){

    this.navCtrl.push(RegisterPage);
  }

  recuperar(){
    this.navCtrl.push(RecuperarPage);
  }

  loginWithFacebook(){
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => {
      //caso houver Sucesso
      //console.log(res)
      this.navCtrl.setRoot(TabsPage);
    }).catch()
  }

  loginVisitante(){

    let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});

    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Você não pode entrar, o seu usuario não está habilitado',
      buttons: ['OK']
    });

    const alert2 = this.alertCtrl.create({
      title: 'Menssagem',
      subTitle: 'Olá, você está logado como visitante, vamos cadastrar seu perfil?',
      buttons: ['OK']
    });

    this.fire.auth.signInAnonymously()
    .then(data => {
      //caso de Sucesso
      alert2.present();
      console.log('data do anonimo', data);
      this.navCtrl.setRoot(TabsPage);

    }).catch((error: any) => {

      if(error.code == 'auth/operation-not-allowed'){
        alert.present();
      }else{
        console.log('Error', error);
      }
      toast.present();

    });


  }






}




