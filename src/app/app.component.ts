import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, RouterLink]
})
export class AppComponent {
  private fs = inject(Firestore);

  async ngOnInit() {
    const ref = doc(this.fs, 'test/check');
    await setDoc(ref, { ok: true, at: new Date().toISOString() });

    const snap = await getDoc(ref);
    console.log('✅ Firestore conectado:', snap.exists(), snap.data());
  }
}
