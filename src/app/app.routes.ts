import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlansComponent } from './components/plans/plans.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { ChartConfigComponent } from './components/chart-config/chart-config.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'image-editor', component: ImageEditorComponent },
  { path: 'chart-example', component: ChartConfigComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
