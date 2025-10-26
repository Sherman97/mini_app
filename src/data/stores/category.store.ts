import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  readonly categories = signal<Category[]>([]);

  constructor(private repo: CategoryRepository) {}

  async load() { this.categories.set(await this.repo.all()); }

  async add(c: Category) {
    const list = [...this.categories(), c];
    this.categories.set(list); await this.repo.saveAll(list);
  }

  async update(patch: { id: string; name?: string; color?: string }) {
    const list = this.categories().map(x => x.id === patch.id ? ({ ...x, ...patch }) : x);
    this.categories.set(list); await this.repo.saveAll(list);
  }

  async remove(id: string) {
    const list = this.categories().filter(x => x.id !== id);
    this.categories.set(list); await this.repo.saveAll(list);
  }

  getById(id: string) { return this.categories().find(c => c.id === id); }
}
