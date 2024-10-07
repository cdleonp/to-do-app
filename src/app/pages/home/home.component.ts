import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^\\S.*$'),
  ]});

  remainingCount = computed(() => {
    const completed = [...this.tasks()].filter((task) => task.completed === true);
    console.log(completed);
    return this.tasks().length - completed.length;
  });

  changeHandler() {
    if(this.newTaskCtrl.valid) {
      this.addNewToDo(this.newTaskCtrl.value.trim());
      this.newTaskCtrl.setValue('');
    }
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
