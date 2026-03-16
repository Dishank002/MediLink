import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
  <h1>{{ message}}</h1>
  `
})
export class AppComponent {
  message = '';

  constructor(private homeService: HomeService){}

  ngOnInit(){
    this.homeService.getWelcomeMessage().subscribe(data =>{
      this.message = data;
    });
  }
}
