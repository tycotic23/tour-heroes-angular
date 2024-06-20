import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  heroes:Hero[]=[];

  constructor(private heroService:HeroService){}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes():void{
      this.heroService.getHeroes()
        .subscribe(heroes=>this.heroes=heroes.slice(1,5));
  }
}
