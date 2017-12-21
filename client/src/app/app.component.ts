import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  showIncludes=false;
    
    constructor(private _router: Router) {}

ngOnInit() {
  this._router.events.subscribe((event: NavigationEnd) => {
    if(event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
    }
  })
}
}