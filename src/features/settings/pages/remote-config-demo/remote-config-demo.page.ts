import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList,
  IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';
import { RemoteConfigService } from '../../../../core/firebase/remote-config.service';

@Component({
  standalone: true,
  templateUrl: './remote-config-demo.page.html',
  styleUrls: ['./remote-config-demo.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonToggle
  ]
})
export class RemoteConfigDemoPage implements OnInit {
  rc = inject(RemoteConfigService);

  async ngOnInit() {
    await this.rc.refresh(['enableCategories']);
  }
}
