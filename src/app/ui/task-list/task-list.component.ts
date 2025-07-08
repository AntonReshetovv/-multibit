import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  onReadMore(event: Event) {
    event.stopPropagation()
  }

  onRemove(event: Event) {
    event.stopPropagation()
  }
}

