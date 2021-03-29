import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}, 
  {path:"userdashboard",component:UserdashboardComponent ,  children:[
    {path:"userprofile",component:UserprofileComponent}
  ]},
  {path:"admindashboard",component:AdmindashboardComponent},
  {path:"viewproducts",component:ViewproductsComponent},
     
    

  {path:'',redirectTo:'home',pathMatch:'full'},//to deal with empty path
  {path:'**',component:PagenotfoundComponent}//to deal with invalid path
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
