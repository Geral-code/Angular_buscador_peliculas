import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //key: e140d055
  private API_URL: string = 'https://www.omdbapi.com/?apikey=e140d055'

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string): Observable<any>{
    return this.http.get(`${this.API_URL}&s=${searchTerm}`);
  }


}
