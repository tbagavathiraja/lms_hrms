import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFormatPipe',
})
export class dateFormatPipe implements PipeTransform {
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'MMM-yyyy');
    return value;
  }
}

@Pipe({
  name: 'normalDate',
})
export class normalDate implements PipeTransform {
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, 'dd-MM-yyyy');
    return value;
  }
}

@Pipe({
  name: 'skipUnderScore',
})
export class skipUnderScore implements PipeTransform {
  transform(value: string) {
    return value.replace(/_/g, " ");
  }
}


@Pipe({
  name: 'removeSpaces',
})
export class removeSpaces implements PipeTransform {
  transform(value: string) {
    return value.replace(/ /g, "");
  }
}

@Pipe({
  name: 'capitalise',
})
export class capitalise implements PipeTransform {
  transform(input: string, length: number): string {
    if(input){
      return input.length > 0 ? input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() )) : '';
    }
  }
}

@Pipe({
  name: 'numberFixedLen',
})
export class numberFixedLen implements PipeTransform {
  transform(n: string, len: string): any {
    let num = parseInt(n, 10);
    let mLength = parseInt(len, 10);
    if (isNaN(num) || isNaN(mLength)) {
      return n;
    }
    let mNum = ""+num;
    if(mNum.length) {
      while (mNum.length < mLength) {
        mNum = '0' + mNum;
      }
    }
    return mNum;
  };
}

@Pipe({
  name: 'keyValues'})

export class keyValues implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}


@Pipe({
  name: 'toPercent'})

export class toPercent implements PipeTransform {
  transform(value: string) {
    return parseInt(value)/100;
  }
}

@Pipe({ name: 'pairs' })
export class Pairs implements PipeTransform {
  transform(value:any) {
    return value.filter((v,i) => i%4==0).map((v,i) => [value[i*4], value[i*4+1]])
  }
}