import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

// 1. Importe o MatDialog e nosso novo componente de diálogo
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

// Imports do Material e Diretivas
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RoleOnlyDirective } from '../../directives/role-only.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatListModule, MatCheckboxModule,
    MatIconModule, MatButtonModule, RoleOnlyDirective,
    MatDialogModule // 2. Importe o MatDialogModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  tasks = this.taskService.getTasks();

  // 3. Injete o MatDialog
  private dialog = inject(MatDialog);

  handleToggleComplete(task: Task) {
    this.taskService.toggleTaskCompletion(task.id);
  }

  // 4. Modifique o método handleDeleteTask
  handleDeleteTask(task: Task) {
    // Abre o nosso componente de diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Define uma largura para o modal
      data: { taskTitle: task.title } // Passa o título da tarefa para o modal
    });

    // Escuta o resultado quando o modal for fechado
    dialogRef.afterClosed().subscribe(result => {
      // 'result' será 'true' se o usuário clicou em "Confirmar"
      if (result) {
        this.taskService.deleteTask(task.id);
      }
    });
  }
}
