import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Injectable, inject } from '@angular/core';
import { Attachment } from '../../../interfaces/attachment';
import { map } from 'rxjs';

export enum AttachmentParent {
  VEHICLE = 'Vehicle',
  POLICY = 'Policy',
}

@Injectable({ providedIn: 'root' })
export class AttachmentListService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  public getAttachments(parent: AttachmentParent, id: string) {
    return this.http
      .get<Attachment[]>(`${this.url}/${parent}/${id}/attachments`)
      .pipe(map((atts) => atts.map((a) => ({ ...a, createdTime: new Date(a.createdTime) }))));
  }

  public deleteAttachment(id: string) {
    return this.http.delete<void>(`${this.url}/Attachment/${id}`);
  }

  public downloadAttachment(id: string) {
    return this.http.get(`${this.url}/Attachment/${id}`, { responseType: 'blob' });
  }
}
