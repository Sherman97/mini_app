import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
  IonFab, IonFabButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { CategoryStore } from '../../../../data/stores/category.store';
import { TaskStore } from '../../../../data/stores/task.store';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  templateUrl: './categories-list.page.html',
  styleUrls: ['./categories-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel,
    IonFab, IonFabButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption,
    RouterLink
  ]
})
export class CategoriesListPage implements OnInit {
  store = inject(CategoryStore);
  tasks = inject(TaskStore);
  constructor(){ addIcons({ addCircle, createOutline, trashOutline }); }
  async ngOnInit(){ await this.store.load(); }

  async deleteCategory(id: string) {
    await this.store.remove(id);
    await this.tasks.unassignByCategory(id); // cascada: las tareas quedan sin categoría
  }
}
