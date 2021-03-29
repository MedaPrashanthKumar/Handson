import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

   //inject Http Client obj
  constructor(private hc:HttpClient) { }

  
  //create Admin
  createUser(adminObj: any):Observable<any>{
    return this.hc.post("/admin/createadmin",adminObj)
  }

  //login user
  loginUser(credObj:any):Observable<any>{
    return this.hc.post("/admin/login",credObj)
  }

  //get user by username
  getUser(username:any):Observable<any>{
    return this.hc.get(`/admin/getadmin/${username}`)
  }
}
