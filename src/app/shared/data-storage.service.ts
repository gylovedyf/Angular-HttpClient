import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    //Return Observable
    // return this.httpClient.put('https://ng-recipe-book-11917.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body', //get the body, not full response
    //     params: new HttpParams().set('auth', token) //Set Query Params
    //   });


    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-11917.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), { reportProgress: true });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-11917.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
    //return Observable
    return this.httpClient.request(req);
  }

  getRecipes() {

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-11917.firebaseio.com/recipes.json')
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
