import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicaPage } from '../pages/dica/dica';
import { RegisterPage } from '../pages/register/register';
import {RecuperarPage} from '../pages/recuperar/recuperar';
import {ProfilePage} from '../pages/profile/profile';
import { PostPage } from '../../src/pages/post/post'

import {TabsPage} from '../pages/tabs/tabs'

import{ProfilePageModule} from '../pages/profile/profile.module'

//importando o AngularFireModule
import { AngularFireModule } from 'angularfire2';

//importando o AngularFireAuthModule
import { AngularFireAuthModule } from 'angularfire2/auth';

//importando o wordpress Service
import {WordpressService} from '../service/wordpress.service';

//importando o HTTP Modulo para rodar os http
import {HttpModule} from '@angular/http';




//colocando a authenticação vinda do site do Firebase

const firebaseAuth = // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
{
  apiKey: "AIzaSyDfcZU8J0yoQ2S538WY8DpxRIPF1RDCcjc",
  authDomain: "nutri-c645e.firebaseapp.com",
  projectId: "nutri-c645e",
  storageBucket: "nutri-c645e.appspot.com",
  messagingSenderId: "404587354068",
  appId: "1:404587354068:web:03615168657d41b4142841",
  measurementId: "G-5XQ2B4XS2M"
};




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DicaPage,
    RegisterPage,
    RecuperarPage,
    //ProfilePage,
    PostPage,

    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ProfilePageModule,
    AngularFireAuthModule, // importando o modulo de authenticação do Angular com Firebase
    AngularFireModule.initializeApp(firebaseAuth), // Importando o Fire Module para inicializar com o FireBaseAuth(O FIrebaseAuth, está vindo de dentro do site do firebase, o codigo a cima)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DicaPage,
    RegisterPage,
    RecuperarPage,
    ProfilePage,
    PostPage,

    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WordpressService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
