import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../Models/Task.models';
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
      title: 'Instalar el Angular CLI',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    }]);

    changeHandler(event: Event){
      const input = event.target as HTMLInputElement;
      const newTask = input.value;
      this.addTask(newTask);
    }

    addTask(title: string){
      const newTask = {
        id: Date.now(),
        title,
        completed: false
      };
      this.tasks.update((tasks) => [...tasks, newTask]);
    }

    deleteTask(index: number){
      this.tasks.update((tasks) => tasks.filter((tasks,i) => i !== index));
    }

    completeTask(index: number){
      this.tasks.update((tasks) => {
        return tasks.map((tasks,i) => {
          if (i === index){
            return {...tasks, completed: !tasks.completed};
          }
          return tasks;
        })
      });
    }
}
