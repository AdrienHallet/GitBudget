import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(
    private messageService: MessageService,
  ) {
  }

  info(title: string, message?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
    });
  }
}
