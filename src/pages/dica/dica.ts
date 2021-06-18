import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { WordpressService } from '../../service/wordpress.service';
import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-dica',
  templateUrl: 'dica.html',
})
export class DicaPage {

  //colocando o post como arrayn any e fazendo uma promisse falando q ele é any tbm
  posts: Array<any> = new Array<any>();
  //colocando as Paginas disponiveis como true
  morePagesAvaliable: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: AngularFireAuth, public toastCtrl: ToastController,
    public LoadingCtrl: LoadingController,
    public wordpressService: WordpressService) {

  }


  ionViewWillEnter(){
    //como ele é Boolean vai entrar como verdadeiro True
    this.morePagesAvaliable = true;
    // criando o if para q se n houver post ele vai chamar o loading para carregar
    if(!(this.posts.length > 0)){
      let loading = this.LoadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPosts()
      .subscribe(data => {
        console.log('Data das Postagens; ', data);
        for(let post of data){
          post.excerpt.rendered =  post.excerpt.rendered.split('<a')[0] + "<p>";
          //inserindo as postagens no post
          this.posts.push(post);
        }
        //se carregou tudo ele fecha o loading com .dismiss
        loading.dismiss();
      });
    }

  }

  logout() {

    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.fire.auth.signOut();
    toast.setMessage("Usuario deslogado!");
    toast.present();

    this.navCtrl.setRoot(HomePage);
  }


  //Metodo do postTapped
  postTapped(event, post){
    this.navCtrl.push(PostPage, {
      item: post
    });
  }

  //criando o metodo de scrollInfinite
  doInfinite(infiniteScroll){

    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});

    this.wordpressService.getRecentPosts(page)
    .subscribe(data => {
      for(let post of data){
          if(!loading){
            infiniteScroll.complete();
          }
          this.posts.push(post);
          loading = false;

      }
    }, err => {

      this.morePagesAvaliable = false;
      toast.setMessage("Fim das Noticias")
      toast.present();

    })
  }

  //metodo para o refresh
  doRefresh(refresher){
    //comando para trazer o refresh
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    //tempo de atualização
    setTimeout(() => {
      refresher.complete();
    }, 2000);

  }


  profile(){
    this.navCtrl.setRoot(ProfilePage);
  }



}
