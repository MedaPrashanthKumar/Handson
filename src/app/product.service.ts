import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //inject HttpClient obj
  constructor(private hc:HttpClient) { }

  //get product by productid
  getProduct(productid:any):Observable<any>{
    return this.hc.get(`/product/getproduct/${productid}`)
  }

  getProducts():Observable<any>{
    return this.hc.get(`/product/getproducts`)
  }

  //create product
  createProduct(productObj:any):Observable<any>{
    return this.hc.post("/product/createproduct",productObj)
  }

  /*login user
  productUser(credObj:any):Observable<any>{
    return this.hc.post("/user/login",credObj)
  }
  */

}
