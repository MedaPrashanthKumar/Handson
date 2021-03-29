import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
productslist:any;
presentid:any;
  constructor(private ps:ProductService,private router:Router) { }

  ngOnInit(): void {
     this.ps.getProducts().subscribe(res=>{
          this.productslist = res.message;
     })

  }

  displaymore(id:any){

  }

  loginCheck(product:any){

  }
  
  

}
