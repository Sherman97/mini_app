import { Injectable } from '@angular/core';
import { StorageService } from '../../core/storage/storage.service';
import { Task } from '../models/task.model';
const KEY = 'v1_tasks';

@Injectable({ providedIn: 'root' })
export class TaskRepository {
  constructor(private storage: StorageService) {}
  async all(): Promise<Task[]> { return await this.storage.get<Task[]>(KEY) ?? []; }
  async saveAll(tasks: Task[]): Promise<void> { await this.storage.set(KEY, tasks); }
}


