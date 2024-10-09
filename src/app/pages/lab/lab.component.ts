import { Component } from '@angular/core';

import { signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css'
})
export class LabComponent {
  title = 'to-do-app';
  tasks = [
    'Instalar el Angular CLI',
    'Crear el proyecto',
    'Correr el proyecto'
  ];
  name = signal('Christian');
  age = 37;
  urlImg = 'https://www.w3schools.com/howto/img_avatar.png';
  disabled = true;
  person = signal({
    name: 'David',
    age: 37,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  });
  clics = signal(0);
  colorControl = new FormControl();
  widthControl = new FormControl('50', {
    nonNullable: true, 
  });
  nameControl = new FormControl('David', [
    Validators.required,
    Validators.minLength(5)
  ]);

  constructor() {
    this.colorControl.valueChanges.subscribe(value => console.log(value));
  }
  clickHandler() {
    alert('Hola');
  }

  changeITHandler(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    console.log(elementInput.value);
    const newValue = elementInput.value;
    this.name.set(newValue);
  }
  changeINHandler(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    console.log(elementInput.value);
  }
  keydownHandler(event: KeyboardEvent) {
    console.log('Event: ', event);
    const elementInput = event.target as HTMLInputElement;
    console.log('Value: ', elementInput.value);
  }
  clickCount() {
    // Increment the count by 1.
    this.clics.update(value => value + 1);
  }
  changeName(event: Event) {
    const elementInput = event.target as HTMLInputElement;
    console.log(elementInput.value);
    const newValue = elementInput.value;
    this.person.update(value => {
      return {
        ...value,
        name: newValue
      }
    });
  }
}
