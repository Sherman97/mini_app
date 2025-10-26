import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  readonly categories = signal<Category[]>([]);
  private unsubscribe?: () => void;

  constructor(private repo: CategoryRepository) {}

  async load() {
    if (this.unsubscribe) return;
    this.unsubscribe = this.repo.watch(rows => this.categories.set(rows));
  }

  async add(c: Category) { await this.repo.add(c); }

  async update(patch: { id: string; name?: string; color?: string }) {
    await this.repo.update(patch);
  }

  async remove(id: string) { await this.repo.remove(id); }

  getById(id: string) { return this.categories().find(c => c.id === id); }
}
