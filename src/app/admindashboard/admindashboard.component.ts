import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router:Router,private ps:ProductService) { }

  ngOnInit(): void {
    localStorage.clear()

  }

  logOut(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

  file:any;
  incomingfile(event:any)
  {
  this.file= event.target.files[0];
  }

  formData=new FormData();
 
 

  onSubmit(formRef:any){

    let productObj=formRef.value;

    //adding image and other data to FormData object
    this.formData.append('photo',this.file,this.file.name);
    this.formData.append("productObj",JSON.stringify(productObj));

    this.ps.createProduct(this.formData).subscribe(res=>{
      if (res["message"]=="product created"){
        alert("product created successfully")
        //navigating to home componenet
        this.router.navigateByUrl("/home")
      }
      else{
        alert("product already existed with same product id!!Please create with another id")
      }
    },
    err=>{
      alert("something went wrong with product creation")
    })
  }

}

