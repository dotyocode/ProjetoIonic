import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable'


@Injectable()
export class WordpressService {
 constructor(public http: Http) {

 }

 //metodo para puxar as postagens
 getRecentPosts(page: number = 1){
  return this.http.get(Config.WORDPRESS_REST_API_URL + 'posts?page=' + page)
  .map(res => res.json());
}

//metodo para puxar os Autores
getAuthor(author){
  return this.http.get(Config.WORDPRESS_REST_API_URL + 'users/' + author)
  .map(res => res.json());
}

//Metodo para puxar as Categorias dos Post
getPostCategories(post){
  let observableBatch = [];
  post.categories.forEach(category => {
    observableBatch.push(this.getCategory(category));
  });
  return Observable.forkJoin(observableBatch);
}

//getcatergory
getCategory(category){
  return this.http.get(Config.WORDPRESS_REST_API_URL + 'categories/' + category)
  .map(res => res.json());

}


}
