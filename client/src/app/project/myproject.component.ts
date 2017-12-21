import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import {ProjectService} from "./project.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-request',
    templateUrl: './myproject.component.html',
})
export class MyProjectComponent implements OnInit {
  projectCollection ;
  itemCount = 0;
  items = [];
  errMessage = "";
  error={};
    search;
    isLoading;
  private storedDetail;
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    private projectService:ProjectService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }

  reloadItems(params) {
    this.projectCollection.query(params).then(items => this.items = items);
  }


    ngOnInit(): void {
      this.errMessage = "";
      this.storedDetail=this.localStorage.getObject('storedDetails');
        this.getProjects();
    }
    
    getProjects(){
        this.isLoading = true;
         let getAll = this.storedDetail;
      getAll.search = this.search;
        this.projectService.getMyProjectSummary(getAll)
        .then(
          (response) =>{
              this.isLoading = false;
            if(response.status === AppConstants.successStatus){
              this.projectCollection = new DataTableResource(response.data);
              this.itemCount = response.data.length;
              console.log(response.data);
            }
            else{
              console.log(response);
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
          this.errMessage=error.message;
        }

      });

    }
}




