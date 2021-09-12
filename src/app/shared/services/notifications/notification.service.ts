import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class NotificationService {

  constructor(
    private messageService: MessageService,
  ) {
  }

  success(title: string, message?: string): void {
    this.message('success', title, message);
  }

  info(title: string, message?: string): void {
    this.message('info', title, message);
  }

  message(severity: string, title: string, message?: string): void {
    this.messageService.add({
      severity,
      summary: title,
      detail: message,
    });
  }
}
