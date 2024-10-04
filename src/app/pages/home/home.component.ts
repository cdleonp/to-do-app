import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      name: 'Instalar el Angular CLI',
      completed: false
    },
    {
      id: Date.now(),
      name: 'Crear el proyecto',
      completed: false
    },
    {
      id: Date.now(),
      name: 'Correr el proyecto',
      completed: false
    },
  ]);

  remainingCount = computed(() => {
    const completed = [...this.tasks()].filter((task) => task.completed === true);
    console.log(completed);
    return this.tasks().length - completed.length;
  });

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const taskName = input.value;
    this.addNewToDo(taskName);
    input.value = '';
  }
  
  addNewToDo(taskName: string) {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false
    }
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update(tasks => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      });
  });
    }
}
