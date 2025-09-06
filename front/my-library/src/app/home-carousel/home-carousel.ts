import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-carousel',
  imports: [NgStyle],
  templateUrl: './home-carousel.html',
  styleUrls: ['./home-carousel.scss']
})
export class HomeCarousel {
  images = [
    '/covers/harry_potter.jpeg',
    '/covers/hunger_games.png',
    '/covers/je_suis_une_legende.jpeg',
    '/covers/nemo.jpeg',
    '/covers/seigneur_anneaux.jpeg',
    '/covers/stephan_king.jpeg',
    '/covers/sully.jpeg',
    '/covers/top_gun.jpeg',
  ];
}
