import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([
    { id: 1, title: 'Estudar @Input e @Output', completed: true },
    { id: 2, title: 'Criar diretiva de Highlight', completed: false }
  ]);

  private nextId = 4;

  getTasks() {
    return this.tasks.asReadonly();
  }

  addTask(title: string) {
    const newTask: Task = { id: this.nextId++, title, completed: false };
    this.tasks.update(currentTasks => [...currentTasks, newTask]);
  }

  deleteTask(id: number) {
    this.tasks.update(currentTasks => currentTasks.filter(task => task.id !== id));
  }

  toggleTaskCompletion(id: number) {
    this.tasks.update(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
