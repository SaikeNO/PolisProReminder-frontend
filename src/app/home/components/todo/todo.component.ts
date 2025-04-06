import { Component, inject } from '@angular/core';
import { TaskService } from './data-access/todo.service';
import { CreateTask, Task } from '../../../shared/interfaces/task';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  private taskService = inject(TaskService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  tasksToDo: Task[] = [];
  tasksDone: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksToDo = tasks.filter((task) => !task.isCompleted).sort((a, b) => a.order - b.order);
      this.tasksDone = tasks.filter((task) => task.isCompleted).sort((a, b) => a.order - b.order);
    });
  }

  openDialog(initialTask?: Task): void {
    const isEditing = !!initialTask;

    this.dialog
      .open(TodoDialogComponent, { data: { task: initialTask } })
      .afterClosed()
      .pipe(
        filter((response: FormGroup) => response && response.valid),
        map((response) => this.mapToCreateInsuranceInsuranceType(response)),
        take(1),
      )
      .subscribe((task) => {
        if (isEditing) {
          this.taskService.updateTask({ ...initialTask, title: task.title }).subscribe(() => {
            this.loadTasks();
            this.snackBar.open('Edytowano zadanie!', 'Zamknij', { duration: 2000 });
          });
        } else {
          this.taskService.addTask(task).subscribe(() => {
            this.loadTasks();
            this.snackBar.open('Zadanie dodane!', 'Zamknij', { duration: 2000 });
          });
        }
      });
  }

  private mapToCreateInsuranceInsuranceType(obj: FormGroup): CreateTask {
    return {
      title: obj.controls['title'].value,
      order: this.tasksToDo.length,
    };
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasksToDo = this.tasksToDo.filter((task) => task.id !== taskId);
      this.tasksDone = this.tasksDone.filter((task) => task.id !== taskId);
      this.snackBar.open('Zadanie usunięte!', 'Zamknij', { duration: 2000 });
    });
  }

  drop(event: CdkDragDrop<Task[]>, targetList: Task[], completed: boolean): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(targetList, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        targetList,
        event.previousIndex,
        event.currentIndex,
      );
    }

    targetList.forEach((task, index) => {
      task.order = index;
      task.isCompleted = completed;
    });

    this.taskService.updateTaskOrder([...this.tasksDone, ...this.tasksToDo]).subscribe();
  }
}
