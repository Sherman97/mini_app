import { ChangeDetectionStrategy, Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonCheckbox, IonLabel, IonButtons, IonButton, IonFab, IonFabButton,
  IonIcon, IonSelect, IonSelectOption, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { TaskStore } from '../../../../data/stores/task.store';
import { CategoryStore } from '../../../../data/stores/category.store';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonCheckbox, IonLabel,
    IonButtons, IonButton, IonFab, IonFabButton, IonIcon,
    IonSelect, IonSelectOption, IonItemSliding, IonItemOptions, IonItemOption,
    RouterLink
  ]
})
export class TasksListPage implements OnInit {
  store = inject(TaskStore);
  categories = inject(CategoryStore);
  router = inject(Router);

  // 'all' = todas; si se elige un id => filtra
  selectedCategoryId = signal<string | 'all'>('all');

  filteredTasks = computed(() => {
    const cat = this.selectedCategoryId();
    const list = this.store.tasks();
    return cat === 'all' ? list : list.filter(t => t.categoryId === cat);
  });

  constructor(){ addIcons({ addCircle, createOutline, trashOutline }); }

  async ngOnInit(){
    await Promise.all([this.store.load(), this.categories.load()]);
  }

  trackById = (_: number, t: any) => t.id;

  async deleteTask(id: string) {
    await this.store.remove(id);
  }
}
