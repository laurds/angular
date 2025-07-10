import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Imports do Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';


// Nossos Serviços e Componentes
import { TaskService } from './services/task.service';
import { AuthService, UserRole } from './services/auth.service';
import { Task } from './models/task';

// Nossas Diretivas
import { HighlightDirective } from './directives/highlight.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { RoleOnlyDirective } from './directives/role-only.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // Material
    MatToolbarModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatListModule, MatIconModule, MatCheckboxModule, MatSelectModule,
    // Nossas Diretivas
    HighlightDirective, AutoFocusDirective, DebounceClickDirective, RoleOnlyDirective
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Injeção de Dependências moderna com inject()
  taskService = inject(TaskService);
  authService = inject(AuthService);

  // Expondo os signals para o template
  tasks = this.taskService.getTasks();
  currentUserRole = this.authService.currentUserRole;

  // Template Reference Variable com ViewChild
  // Acessa o elemento <input #newTaskInput> no template
  @ViewChild('newTaskInput') newTaskInputRef: any;


  handleAddTask(title: string) {
    if (title.trim()) {
      this.taskService.addTask(title);
      // Limpa o input após adicionar
      this.newTaskInputRef.nativeElement.value = '';
    }
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
