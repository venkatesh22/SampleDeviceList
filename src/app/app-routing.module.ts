import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component:  WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'device-list', component:  DeviceListComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
