import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //key: e140d055
  API_URL: string = 'http://www.omdbapi.com/?apikey=e140d055'

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string){
    this.http.get(this.API_URL + '&s=' + searchTerm)
  }


}
