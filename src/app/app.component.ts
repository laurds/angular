import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Importe o RouterOutlet
import { AuthService, UserRole } from './services/auth.service';

// Imports do Material usados no template do PAI
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RoleOnlyDirective } from './directives/role-only.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule, RoleOnlyDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);
  currentUserRole = this.authService.currentUserRole;

  onRoleChange(role: UserRole) {
    this.authService.loginAs(role);
  }
}
