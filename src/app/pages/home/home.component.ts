import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { TaskFilter } from '../../models/task-filter.enum';

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
      completed: false,
      editing: false
    },
  ]);
  Filters = TaskFilter;

  filter = signal<TaskFilter>(TaskFilter.all);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^(?!\\s*$).+'),
  ]});

  newTaskNameCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^(?!\\s*$).+'),
  ]});

  remainingCount = computed(() => {
    const completed = [...this.tasksByFilter()].filter((task) => task.completed === true);
    // console.log(completed);
    return this.tasksByFilter().length - completed.length;
  });

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    const filterMapping: Record<TaskFilter, () => Task[]> = {
      [TaskFilter.pending]: () => tasks.filter((task) => !task.completed),
      [TaskFilter.completed]: () => tasks.filter((task) => task.completed),
      [TaskFilter.all]: () => tasks,
    };
    console.log('Filtered tasks: ', filterMapping[filter]());
    return filterMapping[filter]();
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
      completed: false,
      editing: false
    }
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter((task) => task.id !== id));
  }

  updateTask(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if(task.id === id) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      });
    });
  }
  enableEditingMode(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {                
        if(!task.completed && task.id === id) {
          this.newTaskNameCtrl.setValue(task.name);
          return {
            ...task,
            editing: true
          };
        }
        return {
          ...task,
          editing: false
        }
      });
    });
  }

  editTask(id: number) {
    if(this.newTaskNameCtrl.valid) {
      this.tasks.update((tasks) => {
        return tasks.map((task) => {
          if(task.id === id) {
            return {
              ...task,
              name: this.newTaskNameCtrl.value.trim(),
              editing: false
            }
          }
          return task;
        });
      });
    }    
  }

  changeFilter(filter: TaskFilter) {
    this.filter.set(filter)
  }
}
