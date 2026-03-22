import { Component,OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showLogin = false;
  selectedRole: 'patient' | 'employee' = 'patient';
  isRegister = false;

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

  openLogin(){
    this.showLogin = true;
  }

  closeLogin(){
    this.showLogin = false;
  }

  selectRole(role: 'patient' | 'employee'){
    this.selectedRole = role;
    this.isRegister = false;
  }

  startRegister(){
    this.isRegister = true;
  }

  onOverlayClick(event: MouseEvent){
    if((event.target as HTMLElement).classList.contains('modal-overlay')){
      this.closeLogin();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent){
    if(this.showLogin){
      this.closeLogin();
    }
  }
}
