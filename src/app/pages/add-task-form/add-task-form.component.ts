import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// NOVOS IMPORTS PARA REACTIVE FORMS
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

// Imports do Material e Diretivas
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '../../directives/highlight.directive';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule, // Adicione ReactiveFormsModule aqui
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, HighlightDirective, AutoFocusDirective, MatIconModule
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  private taskService = inject(TaskService);
  private router = inject(Router);

  // Criação do FormGroup
  taskForm = new FormGroup({
    // FormControl para o título, com validação de campo obrigatório
    title: new FormControl('', [Validators.required]),
    // FormControl para a descrição (opcional)
    description: new FormControl('')
  });

  // Método chamado no submit do formulário
  onSubmit(): void {
    // Verifica se o formulário é válido
    if (this.taskForm.invalid) {
      return;
    }

    // Extrai os valores com segurança
    const title = this.taskForm.value.title ?? '';
    const description = this.taskForm.value.description ?? '';

    this.taskService.addTask(title, description);

    // Navega de volta para a página inicial
    this.router.navigate(['/']);
  }
}
