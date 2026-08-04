import { Component, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {

  // @HostBinding('class') controlClass = 'control'; // This is not needed since we are using the host property in the component decorator
  // @HostListener('click') onClick() { // This is not needed since we are using the host property in the component decorator
  //   console.log('Control clicked');
  // }

  label = input.required<string>();
  private el = inject(ElementRef);


  onClick() {
    console.log('Control clicked');
    const width = this.el.nativeElement.offsetWidth;
    console.log('Control width:', width);
  }
}
