import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {TaskListComponent, SearchComponent, AddTaskFormComponent} from 'src/app/ui';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [
    TaskListComponent,
    SearchComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  searchValue = ''

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    this.dialog.open(AddTaskFormComponent, {
      width: '400px',
    });

    (document.activeElement as HTMLElement)?.blur()
  }

  onSearchValue(value: string) {
    this.searchValue = value
  }
}
