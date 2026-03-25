import { Component,OnInit } from '@angular/core';
import { HomeService } from '../../../../services/home.service';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showLogin = false;
  selectedRole: 'patient' | 'employee' = 'patient';
  isRegister = false;
  username: string = '';
  password: string = '';

  message: string = '';

  constructor(
    private homeService: HomeService,
    private router: Router,
    private http: HttpClient  
  ){}

  login(){
    const payload = {
      userName: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5022/api/home/login', payload)
    .subscribe({
      next: (res: any) => {
        console.log(res);

        localStorage.setItem('roleId', res.roleId);
        localStorage.setItem('userName', res.userName);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error);
      }
    });
  }

  ngOnInit(): void {
    // this.homeService.getWelcomeMessage().subscribe({
    //   next: (res) => {
    //     this.message = res;
    //   },
    //   error: (err) =>{
    //     console.error(err);
    //   }
    // });
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
  
  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}
