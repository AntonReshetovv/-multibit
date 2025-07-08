import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Task} from '../models/task';
import { mockData } from '../mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([])

  private get taskList(): Task[] {
    return this.tasks$.getValue()
  }

  get tasksObs(): Observable<Task[]> {
    return this.tasks$.asObservable()
  }

  create(task: Omit<Task, 'id'>): void {
    const newTask = {...task, id: crypto.randomUUID()}
    this.tasks$.next([...this.taskList, newTask])
  }

  getAll(): void {
    this.tasks$.next(mockData)
  }

  getById(id: string): Task | undefined {
    return this.taskList.find(task => task.id === id)
  }

  update(updatedTask: Task): void {
    const updatedTasks = this.taskList.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    )
  this.tasks$.next(updatedTasks)
}

  delete(id: string): void {
    this.tasks$.next(this.taskList.filter(task => task.id !== id))
  }
}
