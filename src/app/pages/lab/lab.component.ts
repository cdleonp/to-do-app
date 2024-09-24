import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  name = 'Christian';
  age = 37;
}
