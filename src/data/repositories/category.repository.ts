import { Injectable } from '@angular/core';
import { StorageService } from '../../core/storage/storage.service';
import { Category } from '../models/category.model';
const KEY = 'v1_categories';

@Injectable({ providedIn: 'root' })
export class CategoryRepository {
  constructor(private storage: StorageService) {}
  async all(): Promise<Category[]> { return await this.storage.get<Category[]>(KEY) ?? []; }
  async saveAll(items: Category[]): Promise<void> { await this.storage.set(KEY, items); }
}
