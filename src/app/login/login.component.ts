import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router,private as:AdminserviceService) { }

  ngOnInit(): void {
    localStorage.clear()
  }

  onSubmit(ref:any){
     let credObj=ref.value;
     console.log(credObj)
    
     //if user
     if(credObj.usertype=="user"){
       delete credObj.usertype;

       this.us.loginUser(credObj).subscribe(
         res=>{
           if(res["message"]=="login success"){

            //save token and username in browser'e memory
            localStorage.setItem("token",res["token"])
            localStorage.setItem("username",res["username"])

            //navigate to user dashboard
            this.router.navigateByUrl("/userdashboard")

           }
           else{
            console.log(res["message"])
            console.log("error here")
            alert(res["message"])
          }

         },
         err=>{
           alert("Something went wrong in user login")
           console.log(err)
         }
       )

     }

     //if admin
     if(credObj.usertype=="admin"){

      delete credObj.usertype;

       this.as.loginUser(credObj).subscribe(
         res=>{
           if(res["message"]=="login success"){

            //save token and username in browser'e memory
            localStorage.setItem("token",res["token"])
            localStorage.setItem("username",res["username"])

            //navigate to admin dashboard
            this.router.navigateByUrl("/admindashboard")

           }
           else{
            console.log(res["message"])
            console.log("error here")
            alert(res["message"])
          }

         },
         err=>{
           alert("Something went wrong in user login")
           console.log(err)
         }
       )

     }


     }


  }

