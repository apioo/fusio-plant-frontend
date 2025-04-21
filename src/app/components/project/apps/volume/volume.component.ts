import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectAppVolume} from "../../../../generated/ProjectAppVolume";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-project-apps-volume',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './volume.component.html',
  styleUrl: './volume.component.css'
})
export class VolumeComponent implements OnInit {

  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() data: Array<ProjectAppVolume> = [];
  @Output() dataChange = new EventEmitter<Array<ProjectAppVolume>>();

  local: Array<Entry> = [];
  newValueSource: string = '';
  newValueDestination: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
      this.local = this.toLocal(this.data);
    }
  }

  doChangeSource(index: number, value?: any) {
    if (!value) {
      return;
    }

    this.local[index].source = value;
    this.dataChange.emit(this.fromLocal());
  }

  doChangeDestination(index: number, value?: any) {
    if (!value) {
      return;
    }

    this.local[index].destination = value;
    this.dataChange.emit(this.fromLocal());
  }

  doAdd() {
    if (!this.newValueSource || !this.newValueDestination) {
      return;
    }

    let newValue: Entry = {
      source: this.newValueSource,
      destination: this.newValueDestination,
    };

    this.local.push(newValue);
    this.newValueSource = '';
    this.newValueDestination = '';
    this.dataChange.emit(this.fromLocal());
  }

  doRemove(index: number) {
    this.local.splice(index, 1);
    this.dataChange.emit(this.fromLocal());
  }

  toLocal(data: Array<ProjectAppVolume>): Array<Entry> {
    let local: Array<Entry> = [];
    data.forEach((value) => {
      local.push({
        source: value.source || '',
        destination: value.destination || '',
      });
    })
    return local;
  }

  fromLocal(): Array<any> {
    let data: Array<any> = [];
    this.local.forEach((entry: Entry) => {
      data.push({
        source: entry.source,
        destination: entry.destination,
      });
    });
    return data;
  }

}

interface Entry {
  source: string
  destination: string
}
