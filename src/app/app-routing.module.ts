import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SignInComponent } from './home-page/sign-in/sign-in.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';
import { UserDashboardComponent } from './home-page/dashboard/user-dashboard/user-dashboard.component';
import { ClientDashboardComponent } from './home-page/dashboard/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './home-page/dashboard/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  {
    path:'home',
      component: HomePageComponent
    },
  {
    path:'signin',
    component: SignInComponent
  },
  {
    path:'signup',
    component: SignUpComponent
  },
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent
  },
  {
    path:'client-dashboard',
    component:ClientDashboardComponent
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent
  },
  {
    path:'app-user-dashboard',
    component:UserDashboardComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
