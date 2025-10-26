import { Injectable } from '@angular/core';
import {
  Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc,
  query, orderBy, where, getDocs, writeBatch
} from '@angular/fire/firestore';
import { Unsubscribe } from '@firebase/util';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskRepository {
  constructor(private fs: Firestore) {}

  /** Suscripción en tiempo real */
  watch(onChange: (rows: Task[]) => void): Unsubscribe {
    const coll = collection(this.fs, 'tasks');
    // orden sugerido por fecha de creación/actualización si existe
    const q = query(coll, orderBy('createdAt', 'desc'));
    const sub = collectionData(q, { idField: 'id' }).subscribe((rows: any[]) => {
      onChange(rows.map(r => ({
        id: r.id, title: r.title, done: !!r.done,
        categoryId: r.categoryId ?? null,
        createdAt: r.createdAt ?? Date.now(),
        updatedAt: r.updatedAt ?? Date.now()
      } as Task)));
    });
    return () => sub.unsubscribe();
  }

  async add(t: Task): Promise<void> {
    const ref = doc(this.fs, `tasks/${t.id}`);
    const now = Date.now();
    await setDoc(ref, {
      title: t.title, done: !!t.done,
      categoryId: t.categoryId ?? null,
      createdAt: t['createdAt'] ?? now,
      updatedAt: now
    });
  }

  async update(patch: { id: string; title?: string; done?: boolean; categoryId?: string | null }): Promise<void> {
    const ref = doc(this.fs, `tasks/${patch.id}`);
    await updateDoc(ref, {
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.done  !== undefined ? { done: patch.done } : {}),
      ...(patch.categoryId !== undefined ? { categoryId: patch.categoryId } : {}),
      updatedAt: Date.now()
    });
  }

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(this.fs, `tasks/${id}`));
  }

  /** Desasignar categoryId en lote */
  async unassignByCategory(categoryId: string): Promise<void> {
    const coll = collection(this.fs, 'tasks');
    const q = query(coll, where('categoryId', '==', categoryId));
    const snap = await getDocs(q);
    const batch = writeBatch(this.fs);
    snap.forEach(d => batch.update(d.ref, { categoryId: null, updatedAt: Date.now() }));
    await batch.commit();
  }
}
