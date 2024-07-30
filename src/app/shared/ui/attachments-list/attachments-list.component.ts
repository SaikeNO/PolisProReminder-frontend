import { Component, Input, OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { AttachmentListService, AttachmentParent } from './data-access/attachments-list.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Attachment } from '../../interfaces/attachment';
import { saveAs } from 'file-saver';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-attachments-list',
  standalone: true,
  imports: [MatListModule, MatIcon, MatButtonModule, AsyncPipe, DatePipe],
  templateUrl: './attachments-list.component.html',
  styleUrl: './attachments-list.component.scss',
})
export class AttachmentsListComponent implements OnInit {
  @Input({ required: true }) public parent!: AttachmentParent;
  @Input({ required: true }) public parentId!: string;

  private attachmentService = inject(AttachmentListService);

  public attachments$ = new Observable<Attachment[]>();

  ngOnInit(): void {
    this.attachments$ = this.attachmentService.getAttachments(this.parent, this.parentId);
  }

  onDelete(id: string) {
    this.attachmentService.deleteAttachment(id).pipe(take(1)).subscribe();
  }

  onDownload(id: string, fileName: string) {
    this.attachmentService
      .downloadAttachment(id)
      .pipe(take(1))
      .subscribe((data) => saveAs(data, fileName));
  }
}
