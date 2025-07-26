import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { HighlightDirective } from '../../directives/highlight.directive';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { DebounceClickDirective } from '../../directives/debounce-click.directive';
import { RoleOnlyDirective } from '../../directives/role-only.directive';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    HighlightDirective,
    AutoFocusDirective,
    DebounceClickDirective,
    RoleOnlyDirective
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() tasks: Task[] = [];

  @Output() addTaskRequest = new EventEmitter<string>();
  @Output() toggleTaskRequest = new EventEmitter<Task>();
  @Output() deleteTaskRequest = new EventEmitter<Task>();
  @Output() debounceAlertRequest = new EventEmitter<void>();

  onAddTask(title: string, inputElement: HTMLInputElement): void {
    if (title.trim()) {
      this.addTaskRequest.emit(title);
      inputElement.value = '';
    }
  }

  onToggleComplete(task: Task): void {
    this.toggleTaskRequest.emit(task);
  }

  onDelete(task: Task): void {
    this.deleteTaskRequest.emit(task);
  }

  onDebounceClick(): void {
    this.debounceAlertRequest.emit();
  }
}
