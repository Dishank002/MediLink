import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  username: string | null = '';
  showProfileMenu:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (res: any) => {
        this.username = res.userName;
      },
      error: () => {
        this.username = '';
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeProfileMenu(){
    this.showProfileMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-wrapper')){
      this.showProfileMenu = false;
    }
  }

}