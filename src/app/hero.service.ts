import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes():Observable<Hero[]>{
    /* return of(HEROES); */
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  getHero(id: number): Observable<Hero|undefined> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.heroesUrl}/${id}`;
    /* return of(HEROES.find(hero => hero.id === id)); */
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero)=>this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number):Observable<Hero>{
    const id = typeof hero === 'number' ? hero:hero.id;
    const url =  `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x=>x.length ? this.log(`found heroes matching "${term}"`) :
      this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  constructor(private mesaggeService:MessageService, private http:HttpClient) { }

  //esto es porque se usa bastante
  private log(message:string){
    this.mesaggeService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error:any):Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
