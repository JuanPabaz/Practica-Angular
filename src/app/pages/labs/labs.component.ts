import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  //Las variables por defecto son publicas
  tasks = signal(['Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes',]);
  name = signal('Juan Pablo');
  age = 20;
  disabled = true;
  img = 'https://angular.io/assets/images/logos/angular/angular.png';
  person = {
    name: 'Juan Pablo',
    age: 20,
    avatar: 'https://w3schools.com/w3images/avatar2.png'
  }

  clickHandler() {
    alert('Hola')
  }

  changeHandler(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(event);
    console.log(input.value);
  }
}
