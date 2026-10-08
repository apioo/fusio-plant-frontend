import {Component, input, linkedSignal, model, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-project-apps-link',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {

  name = input<string>('');
  disabled = input<boolean>(false);
  containers = input<Array<string>>([]);

  data = model<Array<string>>([]);

  local = linkedSignal<Array<string>, Array<Entry>>({
    source: () => this.data(),
    computation: (data) => (data ? data.map((value) => ({ value })) : [])
  });

  newValue = signal<string>('');

  doChange(index: number, value: string) {
    this.local.update((current) => {
      const next = [...current];
      next[index] = { value };
      return next;
    });
    this.syncData();
  }

  doAdd() {
    const value = this.newValue().trim();
    if (!value) {
      return;
    }

    this.local.update((current) => [...current, { value }]);
    this.newValue.set('');
    this.syncData();
  }

  doRemove(index: number) {
    this.local.update((current) => current.filter((_, i) => i !== index));
    this.syncData();
  }

  private syncData() {
    this.data.set(this.local().map((entry) => entry.value));
  }

}

interface Entry {
  value: string
}
