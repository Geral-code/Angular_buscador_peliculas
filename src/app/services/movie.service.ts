import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //key: e140d055
  private API_URL: string = 'https://www.omdbapi.com/?apikey=e140d055'

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string): Observable<Movie[]>{
    return this.http.get<ApiResponse>(`${this.API_URL}&s=${searchTerm}`).pipe(
      map(response => {
        return response.Search;
      })
    );
  }


}
