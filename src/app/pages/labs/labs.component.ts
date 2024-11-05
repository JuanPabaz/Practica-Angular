import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  person = signal({
    name: 'Juan Pablo',
    age: 17,
    avatar: 'https://w3schools.com/w3images/avatar2.png'
  });

  colorCtrl = new FormControl('');

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })
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

  changeAge(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person) => {return {...person, age: parseInt(newValue)}});
  }

  changeName(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((person) => {return {...person, name: newValue}});
  }
}
