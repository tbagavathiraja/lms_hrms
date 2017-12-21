import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isIn:boolean;
    isInAdmin:boolean;
    storedDetails;
  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private activatedRoute: ActivatedRoute,
    public localStorage: CoolLocalStorage
  )
  {
    this.localStorage = localStorage;
      this.isIn = false;
      this.isInAdmin = false;
  }

  ngOnInit() {
      this.storedDetails = this.localStorage.getObject('storedDetails');
  }

  logout(){
    /*this._auth.logout().subscribe(
     (data)=>{console.log(data);this.user=null;}
     )*/
    this.localStorage.clear();
    this.router.navigate(['/']);
  }
    toggleState():void { 
    const bool = this.isIn;
    this.isIn = bool === false ? true : false;
    this.isInAdmin=false;
 }
    toggleStateAdmin():void { 
    const boolAdmin = this.isInAdmin;
    this.isInAdmin = boolAdmin === false ? true : false;
    this.isIn=false;
 }
    isAdmin(){
      return this.storedDetails.employee_role === 'ADMIN';
    }
    isManager(){
      return this.storedDetails.employee_role === 'MANAGER';
    }
    isLead(){
      return this.storedDetails.employee_role === 'LEAD';
    }
    isEmployee(){
      return this.storedDetails.employee_role === 'EMPLOYEE';
    }
    isReadOnly(){
      return this.storedDetails.admin_access === 'Yes';
    }

}
