import { Injectable } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc,
  query, orderBy
} from '@angular/fire/firestore';
import { Unsubscribe } from '@firebase/util';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryRepository {
  constructor(private fs: Firestore) {}

  /** Suscripción en tiempo real */
  watch(onChange: (rows: Category[]) => void): Unsubscribe {
    const coll = collection(this.fs, 'categories');
    const q = query(coll, orderBy('name'));
    const sub = collectionData(q, { idField: 'id' }).subscribe((rows: any[]) => {
      onChange(rows.map(r => ({ id: r.id, name: r.name, color: r.color } as Category)));
    });
    return () => sub.unsubscribe();
  }

  async add(c: Category): Promise<void> {
    const ref = doc(this.fs, `categories/${c.id}`);
    await setDoc(ref, { name: c.name, color: c['color'] ?? null });
  }

  async update(patch: { id: string; name?: string; color?: string }): Promise<void> {
    const ref = doc(this.fs, `categories/${patch.id}`);
    await updateDoc(ref, { ...(patch.name !== undefined ? { name: patch.name } : {}), ...(patch.color !== undefined ? { color: patch.color } : {}) });
  }

  async remove(id: string): Promise<void> {
    const ref = doc(this.fs, `categories/${id}`);
    await deleteDoc(ref);
  }
}
