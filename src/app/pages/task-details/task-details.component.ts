import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskItemComponent } from "src/app/ui/task-item/task-item.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  standalone: true,
  imports: [RouterLink, TaskItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent {
    constructor() { }
}
