import { Component,Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(
    private router: Router,
    private http: HttpClient
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

    this.http.post('https://localhost:7072/api/home/login', payload)
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
