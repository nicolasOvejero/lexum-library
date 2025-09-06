import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit{
  currentPath: String = '';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentPath = this.activatedRoute.snapshot.url.map((segment: any) => segment.path).join('/');
  }
}
