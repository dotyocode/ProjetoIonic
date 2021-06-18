import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../service/wordpress.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable'

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  //dados que vamos pegar do json
  post: any;
  user: string;
  categories: Array<any> = new Array<any>();


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService) {
  }

  //metodo do que iremos ver quando entrarmos
  ionViewWillEnter(){

    //´primeiro sera inciada a pagina de login
    let loading = this.loadingCtrl.create();
    loading.present();
    //iremos pegar os itens da pagina home
    this.post = this.navParams.get('item');

    //o Observable que irar observar tudo que tem dentro da data nome e categorias
    Observable.forkJoin(
      this.getAuthorData(),
      this.getCategories())
      .subscribe(data => {
        this.user = data[0].name;
        this.categories = data[1];
        loading.dismiss();
      });
  }

  //metodo para pegar o author
  getAuthorData(){
    return this.wordpressService.getAuthor(this.post.author);
  }

    // metodo para pegar a categoria
  getCategories(){
    return this.wordpressService.getPostCategories(this.post);
  }



}
