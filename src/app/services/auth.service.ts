import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'guest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. Tenta pegar o valor salvo no localStorage. Se não existir, usa 'guest'.
  private initialRole = (localStorage.getItem('userRole') as UserRole) || 'guest';

  // 2. Inicia o signal com o valor recuperado.
  currentUserRole = signal<UserRole>(this.initialRole);

  loginAs(role: UserRole) {
    // 3. Salva o novo valor no localStorage.
    localStorage.setItem('userRole', role);

    // 4. Atualiza o signal para que o resto da aplicação reaja à mudança.
    this.currentUserRole.set(role);
  }
}
