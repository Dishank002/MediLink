import { Component,Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  @Input() showLogin: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  selectedRole: 'patient' | 'employee' = 'patient';
  isRegister = false;
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ){}

  closeLogin(){
    this.close.emit();
  }
  selectRole(role: 'patient' | 'employee'){
    this.selectedRole = role;
    this.isRegister = false;
  }

  startRegister(){
    this.isRegister = true;
  }

  login(){
    const payload = {
      userName: this.username,
      password: this.password
    };

    this.isLoading = true;

    this.http.post('https://localhost:7072/api/home/login', payload, {
      withCredentials: true
    })
    .subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log(res);

        // localStorage.setItem('token', res.token);
        localStorage.setItem('roleId', res.roleId);
        localStorage.setItem('userName', res.userName);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        alert(err.error);
      }
    });
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
