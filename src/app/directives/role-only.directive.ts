import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthService, UserRole } from '../services/auth.service';

@Directive({
  selector: '[appRoleOnly]',
  standalone: true,
})
export class RoleOnlyDirective {
  private requiredRole: UserRole | undefined;
  private hasView = false;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  )
  {
    effect(() => {
      this.evaluate();
    });
  }

  @Input() set appRoleOnly(role: UserRole) {
    this.requiredRole = role;
    this.evaluate();
  }

  private evaluate() {
    const currentUserRole = this.authService.currentUserRole();

    if (this.requiredRole && currentUserRole === this.requiredRole) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
