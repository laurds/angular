import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'guest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simula o papel do usuário logado.
  currentUserRole = signal<UserRole>('guest');

  // Métodos para simular a troca de papel
  loginAs(role: UserRole) {
    this.currentUserRole.set(role);
  }
}
