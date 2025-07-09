import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox'

import {TaskService} from 'src/app/services/task.service';
import {Task} from 'src/app/models/task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    NgIf,
    AsyncPipe,
    MatIconModule,
    ScrollingModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  tasksObs: Observable<Task[]>
  filteredTasksObs: Observable<Task[]>
  completedTasksCount$ = new BehaviorSubject<number>(0)
  private search$ = new BehaviorSubject<string>('')

  @Input() set searchValue(value: string) {
    this.search$.next(value?.toLowerCase() ?? '')
  }

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskService.getAll()
    this.tasksObs = this.taskService.tasksObs.pipe(
      tap((tasks) => {
        const completedTasksCount = tasks.reduce((acc, cur) => {
          if (cur.status) {
            acc += 1
          }
          return acc
        }, 0)

        this.completedTasksCount$.next(completedTasksCount)
      })
    )
    this.filteredTasksObs = combineLatest([
      this.tasksObs,
      this.search$
    ]).pipe(
      map(([tasks, search]) => {
        return tasks.filter(task => task.title.toLowerCase().includes(search))
      })
    )
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id
  }

  onMoreDetails(id: string): void {
    this.router.navigate(['tasks/', id])
  }

  onRemove(id: string): void {
    this.taskService.delete(id)
  }

  onToggleStatus(task: Task): void {
    task.status = !task.status
    this.taskService.update(task)
  }
}

