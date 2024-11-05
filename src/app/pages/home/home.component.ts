import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../../Models/Task.models';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
newTaskCtrl = new FormControl('', {
  nonNullable: true,
  validators: [
    Validators.required,
    Validators.pattern('^\\S.*$')
  ]
});

filter = signal<'All' | 'Pending' | 'Completed'>('All');
taskByFilter = computed(() => {
  const filter = this.filter();
  const tasks = this.tasks();
  if (filter === 'Pending'){
    return tasks.filter(task => !task.completed);
  }
  if (filter === 'Completed'){
    return tasks.filter(task => task.completed);
  }
  return tasks;
})
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

    changeHandler(){
      if (this.newTaskCtrl.valid){
        const newTask = this.newTaskCtrl.value;  
        this.addTask(newTask);
        this.newTaskCtrl.setValue('');
      }
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

    editTask(index: number){
      this.tasks.update(prevState => {
        return prevState.map((task, position) =>{
          if (position === index){
            return {...task, editing: true};
          }
          return {
            ...task,
            editing: false
          } ;
        })
      })
    }

    updateTaskName(index: number, event: Event){
      const input = event.target as HTMLInputElement;
      this.tasks.update(prevState => {
        return prevState.map((task, position) =>{
          if (position === index){
            return {...task, 
              title: input.value,
              editing: false
            };
          }
          return task;
        })
      })
    }
    
    changeFilter(filter: 'All' | 'Pending' | 'Completed'){
      this.filter.set(filter);
    }
}
