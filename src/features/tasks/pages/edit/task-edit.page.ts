import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStore } from '../../../../data/stores/task.store';
import { CategoryStore } from '../../../../data/stores/category.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-task-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonSelect, IonSelectOption, ReactiveFormsModule]
})
export class TaskEditPage implements OnInit {
  private store = inject(TaskStore);
  categories = inject(CategoryStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: string | null = null;

  title = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  categoryId = new FormControl<string | null>(null);

  async ngOnInit() {
    await this.categories.load();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      const t = this.store.getById(this.id);
      if (t) {
        this.title.setValue(t.title);
        this.categoryId.setValue(t.categoryId ?? null);
      }
    }
  }

  async save() {
    const title = this.title.value.trim();
    const categoryId = this.categoryId.value ?? null;

    if (this.id) {
      await this.store.update({ id: this.id, title, categoryId });
    } else {
      const id = crypto.randomUUID();
      await this.store.add({ id, title, done: false, createdAt: Date.now(), categoryId });
    }
    this.router.navigate(['/tasks']);
  }
}
