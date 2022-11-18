import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinct, filter, fromEvent, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef
  movies$!: Observable<Movie[]>

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(  //escuchando los caracteres que el usuario esta escribiendo
      map((event: Event) => {                                            // estamos mapeando ese caracter para obtener el termino
        const searchTerm = (event.target as HTMLInputElement).value
        return searchTerm 
      }),
      filter((searchTerm: string) => searchTerm.length > 3), // OPERADOR-cuando llegue al 4 caracter hace la peticion HTTP
      debounceTime(500),                                    // OPERADOR-cuando pare de escribir por medio seg. se hara la peticion HTTP 
      distinct(),                                           // OPERADOR-cuando se escribe lo mismo que lo anterior no se hace otra peticion si no la misma
      switchMap((searchTerm: string) =>  this.movieService.getMovies(searchTerm)) 
    ) 
       //
    
  }


  

/*  getMovies(searchTerm: string) {                       // Y ejecuta la peticion HTTP
    this.movieService.getMovies(searchTerm).subscribe(movies => { 
    console.log(movies);
    this.movies = movies !== undefined ? movies : [];
   })
  } */
}
