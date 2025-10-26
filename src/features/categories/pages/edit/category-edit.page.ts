import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryStore } from '../../../../data/stores/category.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, ReactiveFormsModule]
})
export class CategoryEditPage implements OnInit {
  private store = inject(CategoryStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: string | null = null;
  name = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] });

  async ngOnInit() {
    await this.store.load();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const c = this.store.getById(this.id);
      if (c) this.name.setValue(c.name);
    }
  }

  async save(){
    const name = this.name.value.trim();
    if (this.id) {
      await this.store.update({ id: this.id, name });
    } else {
      await this.store.add({ id: crypto.randomUUID(), name });
    }
    this.router.navigate(['/categories']);
  }
}
