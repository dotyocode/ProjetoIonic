import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
//import { DicaPage } from '../dica/dica';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  tabBarElement: any;

  @ViewChild('usuario') email;
  @ViewChild('senha') password;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //fazendo injeção de dependencia do Angular fire Auth
              public fire: AngularFireAuth,
              //importando o ToastController para mostrar as msg de error
              public toastCtrl: ToastController ) {

                //declarando o tabbar
      this.tabBarElement = document.querySelector('.show-tabbar')
  }


    //metodo para nao aparecer a tabsPage

    ionViewWillEnter(){
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



    //metodo para registrar
    registrar() {

      //trazendo o ToastController para dentro do sistema de Register
      let toast = this.toastCtrl.create({duration: 2000, position: 'bottom'});


      this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        //caso de sucesso vai chamar proxima pagina logado
        console.log('Aqui temos a data: ', data);
        toast.setMessage('Usuario Criado com Sucesso!');
        toast.present();
        //Enviando ele para DicaPage
        this.navCtrl.setRoot(TabsPage);

      }).catch((error: any) => {

        if(error.code == 'auth/email-already-in-use'){
          toast.setMessage('O Email digitado já está em uso')
        };

        if(error.code == 'auth/invalid-email'){
          toast.setMessage('Email invalido')
        }

        if(error.code == 'auth/operation-not-allowed'){
          toast.setMessage('No momento não está permitido criar usuarios')
        }

        if(error.code == 'auth/weak-password'){
          toast.setMessage('Vish, sua senha está muito fraca!')
        }
        toast.present();


      });


    }

}
