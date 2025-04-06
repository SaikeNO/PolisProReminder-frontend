import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../../../shared/interfaces/task';

@Component({
  selector: 'app-todo-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.scss',
})
export class TodoDialogComponent {
  private fb = inject(FormBuilder);

  public isEditing: boolean = false;
  public taskId: string | null = null;
  public form = this.fb.nonNullable.group({
    title: ['', [Validators.minLength(1), Validators.maxLength(250), Validators.required]],
  });
  public initialTask: Task | null = null;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null },
  ) {
    this.initialTask = data.task;
    this.form.controls.title.setValue(data.task ? data.task.title : '');
    this.isEditing = !!data.task;
    this.taskId = data.task ? data.task.id : null;
  }

  isSubmitDisabled() {
    return this.form.invalid || this.initialTask?.title === this.form.controls.title.value;
  }
}
