import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {Task} from 'src/app/models/task';
import {TaskService} from 'src/app/services/task.service';
import {TaskItemComponent} from "src/app/ui/list/task-item/task-item.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  standalone: true,
  imports: [TaskItemComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent implements OnInit {
  task: Task | undefined

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.paramMap.get('id')
    if (taskId) {
      this.task = this.taskService.getById(taskId)
    }
  }
}
