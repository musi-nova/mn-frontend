import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, Resolve } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userInformation = {
    name: '',
    email: '',
    password: ''
  }

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  get user() {
    return this.userService.getUsers().pipe(
      map((users) => users[0])
    );
  }
}
