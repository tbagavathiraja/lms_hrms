import { Injectable} from '@angular/core';


@Injectable()

export class AppService {


  public data: any;
    constructor() {
  }

  setter(data: any) {
    this.data = data;
  }

  getter(){
    return this.data;
  }
}
