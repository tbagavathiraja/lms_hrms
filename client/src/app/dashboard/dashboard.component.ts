import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private appComponent:AppComponent,
  ) {
    this.appComponent.showIncludes = true;
  }

  ngOnInit() {
  }

}
