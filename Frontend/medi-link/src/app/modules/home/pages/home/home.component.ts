import { Component,OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message: string = '';

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    this.homeService.getWelcomeMessage().subscribe({
      next: (res) => {
        this.message = res;
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
