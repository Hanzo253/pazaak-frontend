import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStartGame]'
})
export class StartGameDirective {

  constructor(private elem : ElementRef) { }

  private hideButton(display: string) {
    this.elem.nativeElement.style.display = display;
  }

  @HostListener("click") onClick() {
    this.hideButton('none');
  }
}
