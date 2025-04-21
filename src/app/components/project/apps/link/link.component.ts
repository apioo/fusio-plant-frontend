import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-project-apps-link',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data: Array<string> = [];
  @Input() containers: Array<string> = [];
  @Output() dataChange = new EventEmitter<Array<string>>();

  local: Array<Entry> = [];
  newValue: any = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.local = this.toLocal(this.data);
    }
  }

  doChange(index: number, value?: any) {
    this.local[index].value = value;
    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    if (!this.newValue) {
      return;
    }

    let newValue = this.newValue;

    this.local.push({
      value: newValue
    });
    this.newValue = '';
    this.dataChange.emit(this.fromLocal());
  }

  doRemove(index: number) {
    this.local.splice(index, 1);
    this.dataChange.emit(this.fromLocal());
  }

  toLocal(data: Array<any>): Array<Entry> {
    let local: Array<Entry> = [];
    data.forEach((value) => {
      local.push({
        value: value
      });
    })
    return local;
  }

  fromLocal(): Array<any> {
    let data: Array<any> = [];
    this.local.forEach((entry: Entry) => {
      data.push(entry.value);
    });
    return data;
  }

}

interface Entry {
  value: string
}
