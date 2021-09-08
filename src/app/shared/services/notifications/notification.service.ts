import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(
    private messageService: MessageService,
  ) {
  }

  info(title: string, message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: message,
    });
  }
}
