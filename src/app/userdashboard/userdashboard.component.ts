import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
 
 
  username:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    //get username from localstorage
   this.username= localStorage.getItem("username")
  }

  logOut(){
    localStorage.clear();
    //navigate to home
    this.router.navigateByUrl("/home")
  }

}
