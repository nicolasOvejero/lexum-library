import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class Popup {
  @Input()
  isVisible = false;

  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  close() {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
