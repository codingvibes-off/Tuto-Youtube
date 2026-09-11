import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  text: string;
  kind: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly messages = signal<ToastMessage[]>([]);
  private nextId = 1;

  show(text: string, kind: ToastMessage['kind'] = 'info', durationMs = 3200) {
    const id = this.nextId++;
    this.messages.update((list) => [...list, { id, text, kind }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  dismiss(id: number) {
    this.messages.update((list) => list.filter((m) => m.id !== id));
  }
}
