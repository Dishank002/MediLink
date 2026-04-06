import { Component,OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../../../auth/components/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showLogin = false;

  constructor(
    private homeService: HomeService
  ){}

  ngOnInit(): void {}

  openLogin(){
    this.showLogin = true;
  }

  closeLogin(){
    this.showLogin = false;
  }
}
