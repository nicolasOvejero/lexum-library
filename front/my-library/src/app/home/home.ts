import { Component } from '@angular/core';
import { HomeCarousel } from '../home-carousel/home-carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeCarousel
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  constructor(private router: Router) {}

  redirectToBooksPage () {
    this.router.navigate(['/books']);
  }

  redirectToAuthorsPage() {
    this.router.navigate(['/authors']);
  }
}
