import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {NgIf} from "@angular/common";

import {TaskService} from 'src/app/services/task.service';


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskFormComponent {

  form = new FormGroup<{
    title: FormControl<string>,
    description: FormControl<string>
  }>({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', {nonNullable: true})
  })

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskFormComponent>
  ) {
  }

  addTask() {
    const {title, description} = this.form.getRawValue()
    if (title.trim()) {
      this.taskService.create({
        title,
        description,
        status: false
      })
      this.dialogRef.close()
    }
  }
}
