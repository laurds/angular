import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports do Material e Diretivas que AINDA SÃO USADAS no AppComponent
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RoleOnlyDirective } from './directives/role-only.directive';

// Nossos Serviços
import { TaskService } from './services/task.service';
import { AuthService, UserRole } from './services/auth.service';
import { Task } from './models/task';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RoleOnlyDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  taskService = inject(TaskService);
  authService = inject(AuthService);

  tasks = this.taskService.getTasks();
  currentUserRole = this.authService.currentUserRole;

  handleAddTask(title: string) {
    this.taskService.addTask(title);
  }

  handleToggleComplete(task: Task) {
    this.taskService.toggleTaskCompletion(task.id);
  }

  handleDeleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }

  onRoleChange(role: UserRole) {
    this.authService.loginAs(role);
  }

  alertaDebounce() {
    alert("Botão clicado com sucesso após o debounce!");
  }
}
