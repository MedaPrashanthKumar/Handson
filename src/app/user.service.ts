import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//inject Http Client obj
  constructor(private hc:HttpClient) { }

  
  //create user
  createUser(userObj: any):Observable<any>{
    return this.hc.post("/user/createuser",userObj)
  }

  //login user
  loginUser(credObj:any):Observable<any>{
    return this.hc.post("/user/login",credObj)
  }

  //get user by username
  getUser(username:any):Observable<any>{
    return this.hc.get(`/user/getuser/${username}`)
  }
}
