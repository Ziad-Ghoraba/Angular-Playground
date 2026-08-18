import { Directive, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host:{
    '(click)': 'onConfirmLeavePage($event)'
  },
  hostDirectives: [
    LogDirective
  ]
})

export class SafeLinkDirective {
  queryParams = input<string>('appSafeLink', {alias: 'appSafeLink'});

  constructor() {
    console.log('SafeLinkDirective initialized');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const confirmation = window.confirm('Are you sure you want to leave this page?');
    if (!confirmation) {
      event?.preventDefault();
      return;
    }
    (event.target as HTMLAnchorElement).href+='?from=' + this.queryParams();

  }
}
