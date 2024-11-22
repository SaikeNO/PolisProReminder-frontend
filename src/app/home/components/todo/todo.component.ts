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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);

  tasksToDo: Task[] = [
    { completed: false, id: '123', order: 1, title: 'Siema' },
    { completed: false, id: '1223', order: 2, title: 'asdasd' },
  ];
  tasksDone: Task[] = [{ completed: true, id: '123', order: 2, title: 'asdasd' }];

  public form = this.fb.nonNullable.group({
    title: ['', [Validators.minLength(3), Validators.maxLength(100), Validators.required]],
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksToDo = tasks.filter((task) => !task.completed).sort((a, b) => a.order - b.order);
      this.tasksDone = tasks.filter((task) => task.completed).sort((a, b) => a.order - b.order);
    });
  }

  addTask(): void {
    if (this.form.valid) {
      const task = this.form.value as CreateTask;

      this.taskService.addTask(task).subscribe((task) => {
        task.order = this.tasksToDo.length;
        this.tasksToDo.push(task);
        this.form.reset();
      });
    }
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasksToDo = this.tasksToDo.filter((task) => task.id !== taskId);
      this.tasksDone = this.tasksDone.filter((task) => task.id !== taskId);
    });
  }

  drop(
    event: CdkDragDrop<Task[]>,
    targetList: Task[],
    sourceList: Task[],
    completed: boolean,
  ): void {
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
      task.completed = completed;
    });

    this.taskService.updateTaskOrder([...this.tasksToDo, ...this.tasksDone]).subscribe();
  }
}
