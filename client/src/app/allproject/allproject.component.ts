import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import { CoolLocalStorage } from 'angular2-cool-storage';
import { AllProjectService } from "./allproject.service";
import {AppConstants, ErrorConstants} from "../app.constant";
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-request',
    templateUrl: './allproject.component.html',
})
export class AllProjectComponent implements OnInit {
  projectCollection ;
  itemCount = 0;
  items = [];
  errMessage = "";
  error={};
    search;
    isLoading:boolean;
  private storedDetail;
  constructor(
    private appComponent:AppComponent,
    public localStorage: CoolLocalStorage,
    private projectService:AllProjectService
  ){
    console.log(this.appComponent);
    this.appComponent.showIncludes=true;
  }

  reloadItems(params) {
    this.projectCollection.query(params).then(items => this.items = items);
  }


    ngOnInit(): void {
      this.errMessage = "";
        this.getAllProjects();
    }
    getAllProjects(){
        this.isLoading = true;
        this.storedDetail = this.localStorage.getObject('storedDetails');
        let getAll = this.storedDetail;
        getAll.search = this.search;
      this.projectService.getProjectSummary(getAll)
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
        this.isLoading = false;
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