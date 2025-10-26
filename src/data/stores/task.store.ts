import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  readonly tasks = signal<Task[]>([]);
  readonly pendingCount = computed(() => this.tasks().filter(t => !t.done).length);

  constructor(private repo: TaskRepository) {}

  async load() { this.tasks.set(await this.repo.all()); }

  async add(task: Task) {
    const list = [...this.tasks(), task];
    this.tasks.set(list); await this.repo.saveAll(list);
  }

  async update(patch: { id: string; title?: string; done?: boolean; categoryId?: string | null }) {
    const list = this.tasks().map(t => t.id === patch.id ? ({ ...t, ...patch, updatedAt: Date.now() }) : t);
    this.tasks.set(list); await this.repo.saveAll(list);
  }

  async toggle(id: string) {
    const list = this.tasks().map(t => t.id === id ? ({...t, done: !t.done, updatedAt: Date.now()}) : t);
    this.tasks.set(list); await this.repo.saveAll(list);
  }

  async remove(id: string) {
    const list = this.tasks().filter(t => t.id !== id);
    this.tasks.set(list); await this.repo.saveAll(list);
  }

  getById(id: string) { return this.tasks().find(t => t.id === id); }

  async assignCategory(taskId: string, categoryId: string | null) {
    await this.update({ id: taskId, categoryId });
  }

  async unassignByCategory(categoryId: string) {
    const list = this.tasks().map(t => t.categoryId === categoryId ? ({ ...t, categoryId: null, updatedAt: Date.now() }) : t);
    this.tasks.set(list); await this.repo.saveAll(list);
  }
}
