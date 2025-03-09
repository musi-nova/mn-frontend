import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<boolean>();
  isClosed = true;

  constructor(private router: Router, private authService: AuthService
  ) { }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.toggle.emit(this.isClosed);
  }
  logout() {
    console.log('Logout clicked');
    this.authService.logout();
    // Redirect to home page
    this.router.navigate(['/']);
  }
}