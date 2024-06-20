import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
  hero:Hero|undefined;

  constructor(private route:ActivatedRoute, private heroService:HeroService, private location:Location){}

  ngOnInit(): void {
    this.getHero();
  }

  getHero():void{
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      //el + para convertir id a numero
      this.heroService.getHero(+id).subscribe(hero=> this.hero=hero);
    }
    
  }

  goBack():void{
    this.location.back();
  }

  save():void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(()=>this.goBack());
    }
  } 

}
