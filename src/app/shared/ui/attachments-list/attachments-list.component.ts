import { Component, Input, OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { AttachmentListService, AttachmentParent } from './data-access/attachments-list.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, Observable, catchError, finalize, take, throwError } from 'rxjs';
import { Attachment } from '../../interfaces/attachment';
import { saveAs } from 'file-saver';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorInfoComponent } from '../error-info/error-info.component';

@Component({
  selector: 'app-attachments-list',
  standalone: true,
  imports: [MatListModule, MatIcon, MatButtonModule, MatProgressSpinnerModule, AsyncPipe, DatePipe],
  templateUrl: './attachments-list.component.html',
  styleUrl: './attachments-list.component.scss',
})
export class AttachmentsListComponent implements OnInit {
  @Input({ required: true }) public parent!: AttachmentParent;
  @Input({ required: true }) public parentId!: string;

  private attachmentService = inject(AttachmentListService);

  public attachments$ = new Observable<Attachment[]>();
  public error$ = new BehaviorSubject(false);
  public isLoading$ = new BehaviorSubject(false);

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.attachments$ = this.attachmentService.getAttachments(this.parent, this.parentId).pipe(
      catchError((error) => {
        this.error$.next(true);
        return throwError(() => error);
      }),
      finalize(() => this.isLoading$.next(false)),
    );
  }

  onDelete(id: string) {
    this.attachmentService
      .deleteAttachment(id)
      .pipe(take(1))
      .subscribe(() => {
        this.attachments$ = this.attachmentService.getAttachments(this.parent, this.parentId).pipe(
          catchError((error) => {
            this.error$.next(true);
            return throwError(() => error);
          }),
          finalize(() => this.isLoading$.next(false)),
        );
      });
  }

  onDownload(id: string, fileName: string) {
    this.attachmentService
      .downloadAttachment(id)
      .pipe(take(1))
      .subscribe((data) => saveAs(data, fileName));
  }
}
