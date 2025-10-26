import { Injectable, signal } from '@angular/core';
import { getRemoteConfig, getBoolean } from '@angular/fire/remote-config';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private flags = signal<Record<string, boolean>>({});
  isEnabled = (key: string) => !!this.flags()[key];

  async refresh(keys: string[]) {
    const rc = getRemoteConfig();
    const next: Record<string, boolean> = {};
    for (const k of keys) next[k] = getBoolean(rc, k);
    this.flags.set(next);
  }
}
