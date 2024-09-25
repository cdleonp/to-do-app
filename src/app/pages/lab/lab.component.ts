import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule],
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
  person = {
    name: 'Christian',
    age: 37,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  }
  clics = signal(0);

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
}
