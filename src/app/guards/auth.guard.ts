import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserRole() === 'admin') {
    return true;
  } else {
    alert('Acesso negado. Apenas administradores podem adicionar tarefas.');
    router.navigate(['/']);
    return false; // Bloqueia o acesso à rota
  }
};
