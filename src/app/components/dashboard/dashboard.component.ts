import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInformation = {
    name: '',
    email: 'placeholder',
    password: ''
  };

  userPlaylists: any[] = [];

  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadUserInfo();
    this.loadUserPlaylists();
  }

  loadUserInfo() {
    this.userService.getUserInfo().subscribe(
      (response: any) => {
        this.userInformation = response;
      },
      (error: any) => {
        console.error('Error fetching user info:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user information' });
      }
    );
  }

  loadUserPlaylists() {
    this.userService.getUserPlaylists().subscribe(
      (response: any) => {
        console.log('Playlists:', response);
        this.userPlaylists = response;
        // add the length of the response to the userPlaylists array
      },
      (error: any) => {
        console.error('Error fetching user playlists:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user playlists' });
      }
    );
  }
}