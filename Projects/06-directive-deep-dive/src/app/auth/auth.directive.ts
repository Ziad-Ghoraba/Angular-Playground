import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  role = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const hasPermission = this.authService.activePermission() === this.role();
      if (hasPermission) {
        this.viewRef.createEmbeddedView(this.templateRef);
      }
      else {
        this.viewRef.clear();
      }
    });
  }
}
