import { NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DndDirective } from '../../directives/dnd.directive';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-attachment-input',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule, MatListModule, CustomDatePipe, DndDirective],
  templateUrl: './attachment-input.component.html',
  styleUrl: './attachment-input.component.scss',
})
export class AttachmentInputComponent {
  @ViewChild('attachmentDropRef', { static: false }) attachmentDropEl!: ElementRef;
  attachments: File[] = [];

  @Output() onAttachmentsChange = new EventEmitter<File[]>();

  onAttachmentDropped(attachments: FileList) {
    this.prepareAttachmentsList(attachments);
  }

  attachmentBrowseHandler(e: Event) {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.prepareAttachmentsList(input.files);
  }

  handleDelete(index: number) {
    this.attachments.splice(index, 1);
    this.onAttachmentsChange.emit(this.attachments);
  }

  prepareAttachmentsList(attachments: FileList) {
    this.attachments = [...this.attachments, ...Array.from(attachments)];
    this.attachmentDropEl.nativeElement.value = '';
    this.onAttachmentsChange.emit(this.attachments);
  }

  // /**
  //  * format bytes
  //  * @param bytes (File size in bytes)
  //  * @param decimals (Decimals point)
  //  */
  // formatBytes(bytes: number, decimals = 2) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }
}
