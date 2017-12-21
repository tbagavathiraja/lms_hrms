import { Directive, ElementRef, HostListener, Input, Output,EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[OnlyNumber]',
  providers: [NgModel]
  
})
export class OnlyNumber {

  constructor(private el: ElementRef,private model:NgModel) { }

  @Input() OnlyNumber: boolean;
  @Output() ngModelChange:EventEmitter<any> = new EventEmitter()

  @HostListener('keyup', ['$event']) onKeyUp(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 190) {
            e.preventDefault();
            e.stopPropagation();
            this.ngModelChange.emit(this.model.value.replace(/[^0-9]+/g, ""))
            return false;
        }
        this.ngModelChange.emit(this.model.value.replace(/[^0-9]+/g, ""))
      }
  }
}

@Directive({
    selector: "[menuClose]"
})
export class CloseMenuDirective {
    @Input()
    public menu: any;

    constructor(private element: ElementRef) { }

    @HostListener("click")
    private onClick() {
        this.menu.classList.remove("in");
    }
}