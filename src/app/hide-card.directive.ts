import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHideCard]'
})
export class HideCardDirective {

  constructor(private elem : ElementRef) { }

  private hideCard(display: string) {
    this.elem.nativeElement.style.display = display;
  }

  @HostListener("click") onClick() {
    this.hideCard('none');
  }
}
