import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AppService} from "../app.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import {LoginService} from "./login.service";
import {AuthService} from "angular2-social-login";
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ResetPasswordService } from '../reset-password/reset-password.service'

export class Credential{
  employee_email:string;
  password:string;
  tenant_id:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  credential: Credential={
    employee_email:"",
    password:"",
    tenant_id:"",
  }

  errMessage = "";
  isUnKnown:boolean=false;
  error={};
  logindata ={};

  constructor(
    private route :ActivatedRoute,
    private router :Router,
    private loginService:LoginService,
    private appService:AppService,
    public _auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    private resetPasswordService : ResetPasswordService )
  {
    this.appComponent.showIncludes=false;
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.errMessage = "";
    this.activatedRoute.params.subscribe((params: Params) => {
      let tenant = {"tenant":params['tenant']};
      this.loginService.getLoginType(tenant)
        .then((logindata) =>{
        console.log(logindata)
             if(logindata.status === AppConstants.successStatus){
              this.logindata = logindata.data[0];
              this.credential.tenant_id=logindata.data[0].tenant_id;
            }
            else{
              this.error=logindata;
            }
          }).catch((error)=>{

          if(error.json().code==null){
            this.error={
              message:error.statusText,
              status:error.status
            };
          }else{
            this.error={};
            this.errMessage=error.message;
          }1

        });
    });

  }

  validateText(str :string):boolean{
    if(str){


      if(!str || str === ""){
        return false
      }
      return true;
    }
    return false;
  }

  forgotPassword():void {
    if(!this.validateText(this.credential.employee_email)) {
      this.errMessage = ErrorConstants.emailError;
    }

    this.resetPasswordService.resetPassword(this.credential);


    }




  login():void{
    if(!this.validateText(this.credential.employee_email)){
      this.errMessage = ErrorConstants.emailError;
    }else if(!this.validateText(this.credential.password)){
      this.errMessage = ErrorConstants.passwordError;
    }else{
      this.errMessage = '';
      this.loginService.authenticate(this.credential)
        .then((response) =>{
          console.log(response)
        if(response.status === AppConstants.successStatus){
              /*this.appService.settter(response.data[0]);*/
          this.localStorage.clear();

          this.localStorage.setObject('storedDetails',response.data[0]);
          this.localStorage.setItem('auth_token', JSON.stringify(response.data[0].token));
              this.appComponent.showIncludes=true;
              console.log(JSON.stringify(response.data))
              this.router.navigate(['/'+response.data[0].url]);
            }
            else{
              this.errMessage=response.message;
            }
          }).catch((error)=>{

       // console.log("HERE"+error.json())
        if(error.json()==1000)
        {

          this.errMessage="inValid mailid or password";
        }
        else if(error.json().code==null){
          this.error={
            message:error.statusText,
            status:error.status
          };
        }else{
          this.error={};
          this.errMessage=error.json().message;
        }

      });
    }
  }
  private user;
  sub: any;

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        this.user=data;
        this.user.tenant_id=this.credential.tenant_id;
        this.loginService.googleAuthenticate(this.user)
          .then(
            (response) =>{
              if(response.status === AppConstants.successStatus){
                /*this.appService.settter(response.data[0]);*/

                this.localStorage.setObject('storedDetails', response.data[0]);
                console.log(this.localStorage.getObject('storedDetails'));
                this.appComponent.showIncludes=true;
                this.router.navigate(['/'+response.data[0].url]);
              }
              else{
                this.errMessage=response.message;
              }
            }).catch((error)=>{

          if(error.json().code==null){
            this.error={
              message:error.statusText,
              status:error.status
            };
          }else{
            this.error={};
            this.errMessage=error.json().message;
          }

        });
      }
    )
  }

  logout(){
    /*this._auth.logout().subscribe(
      (data)=>{console.log(data);this.user=null;}
    )*/
    this.localStorage.clear();
    this.router.navigate(['/']);
  }



  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }

  }

}
