import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  readonly tasks = signal<Task[]>([]);
  readonly pendingCount = computed(() => this.tasks().filter(t => !t.done).length);

  private unsubscribe?: () => void;

  constructor(private repo: TaskRepository) {}

  async load() {
    if (this.unsubscribe) return; // ya suscrito
    this.unsubscribe = this.repo.watch(rows => this.tasks.set(rows));
  }

  async add(task: Task) { await this.repo.add(task); }

  async update(patch: { id: string; title?: string; done?: boolean; categoryId?: string | null }) {
    await this.repo.update(patch);
  }

  async toggle(id: string) {
    const t = this.getById(id);
    if (!t) return;
    await this.repo.update({ id, done: !t.done });
  }

  async remove(id: string) { await this.repo.remove(id); }

  getById(id: string) { return this.tasks().find(t => t.id === id); }

  async assignCategory(taskId: string, categoryId: string | null) {
    await this.repo.update({ id: taskId, categoryId });
  }

  async unassignByCategory(categoryId: string) {
    await this.repo.unassignByCategory(categoryId);
  }
}
